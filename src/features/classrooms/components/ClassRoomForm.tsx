import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define types
type ClassRoom = {
  id?: string;
  grade_id: string;
  division_id: "A" | "B" | "C";
  class_mode_id: "morning" | "evening";
  academic_year_id: string;
  teacher_id: string;
  status: "active" | "inactive";
};

type ClassRoomFormProps = {
  mode: "ADD" | "EDIT" | "VIEW";
  classRoomId?: string;
};

// Mock data - in a real app, this would come from an API
const mockTeachers = [
  { id: "tchr-001", name: "John Doe" },
  { id: "tchr-002", name: "Jane Smith" },
  { id: "tchr-003", name: "Robert Johnson" },
];

// Mock students data - in a real app, this would come from an API
const mockStudents = [
  { id: "std-001", admission_no: "2023-001", first_name: "Ahmed", last_name: "Khan", gender: "male" as const, class_id: "1" },
  { id: "std-002", admission_no: "2023-002", first_name: "Fatima", last_name: "Ali", gender: "female" as const, class_id: "1" },
  { id: "std-003", admission_no: "2023-003", first_name: "Mohammed", last_name: "Hassan", gender: "male" as const, class_id: "1" },
  { id: "std-004", admission_no: "2023-004", first_name: "Aisha", last_name: "Omar", gender: "female" as const, class_id: "2" },
  { id: "std-005", admission_no: "2023-005", first_name: "Yusuf", last_name: "Ibrahim", gender: "male" as const, class_id: "2" },
];

// Fetch students by classroom ID - in a real app, this would be an API call
const fetchStudentsByClassroom = async (classroomId: string) => {
  return new Promise<typeof mockStudents>((resolve) => {
    setTimeout(() => {
      // Filter students by class_id (in a real app, this would be a proper join query)
      const students = mockStudents.filter(student => student.class_id === classroomId);
      resolve(students);
    }, 500);
  });
};

// Current academic year
const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;
const academicYearId = `${currentYear}-${nextYear.toString().slice(2)}`;

// Form validation schema
const classRoomFormSchema = z.object({
  grade_id: z.string().min(1, "Grade is required"),
  division_id: z.enum(["A", "B", "C"]),
  class_mode_id: z.enum(["morning", "evening"]),
  academic_year_id: z.string().min(1, "Academic year is required"),
  teacher_id: z.string().min(1, "Homeroom teacher is required"),
  status: z.enum(["active", "inactive"]),
});

type ClassRoomFormValues = z.infer<typeof classRoomFormSchema>;

// Fetch classroom by ID - in a real app, this would be an API call
const fetchClassRoom = async (id: string): Promise<ClassRoom> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data - in a real app, this would come from an API
      const mockClassRoom: ClassRoom = {
        id,
        grade_id: "5",
        division_id: "A",
        class_mode_id: "morning",
        academic_year_id: academicYearId,
        teacher_id: "tchr-001",
        status: "active",
      };
      resolve(mockClassRoom);
    }, 500);
  });
};

const createClassRoom = async (data: ClassRoom): Promise<ClassRoom> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...data,
        id: `cls-${Math.random().toString(36).substr(2, 9)}`,
      });
    }, 500);
  });
};

const updateClassRoom = async (
  id: string,
  data: ClassRoom
): Promise<ClassRoom> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...data, id });
    }, 500);
  });
};

export function ClassRoomForm({ mode, classRoomId }: ClassRoomFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(mode !== "ADD");
  const [students, setStudents] = useState<Array<{
    id: string;
    admission_no: string;
    first_name: string;
    last_name: string;
    gender: 'male' | 'female';
  }>>([]);
  const isViewMode = mode === "VIEW";

  const form = useForm<ClassRoomFormValues>({
    resolver: zodResolver(classRoomFormSchema),
    defaultValues: {
      grade_id: "",
      division_id: "A",
      class_mode_id: "morning",
      academic_year_id: academicYearId,
      teacher_id: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (mode !== "ADD" && classRoomId) {
      const loadClassRoom = async () => {
        try {
          const classRoom = await fetchClassRoom(classRoomId);
          form.reset({
            grade_id: classRoom.grade_id,
            division_id: classRoom.division_id,
            class_mode_id: classRoom.class_mode_id,
            academic_year_id: classRoom.academic_year_id,
            teacher_id: classRoom.teacher_id,
            status: classRoom.status,
          });
          
          // Load students for this classroom in view mode
          if (isViewMode) {
            const classStudents = await fetchStudentsByClassroom(classRoomId);
            setStudents(classStudents);
          }
        } catch (error) {
          console.error("Failed to load classroom", error);
          toast({
            title: "Error",
            description: "Failed to load classroom data",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      loadClassRoom();
    }
  }, [mode, classRoomId, form, toast, isViewMode]);

  const onSubmit = async (data: ClassRoomFormValues) => {
    try {
      setIsLoading(true);
      if (mode === "ADD") {
        await createClassRoom(data as ClassRoom);
        toast({
          title: "Success",
          description: "Classroom created successfully",
        });
      } else if (mode === "EDIT" && classRoomId) {
        await updateClassRoom(classRoomId, data as ClassRoom);
        toast({
          title: "Success",
          description: "Classroom updated successfully",
        });
      }
      navigate("/classrooms");
    } catch (error) {
      console.error("Error saving classroom", error);
      toast({
        title: "Error",
        description: "Failed to save classroom",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="min-w-[calc(100vw-1000px)] max-h-[calc(100vh-200px)] overflow-auto">
        <CardHeader>
          <CardTitle>
            {mode === "ADD"
              ? "Add New Classroom"
              : mode === "EDIT"
              ? "Edit Classroom"
              : "Classroom Details"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-4"
          >
            <div className="space-y-6">
              {/* Grade */}
              <div className="space-y-2">
                <Label htmlFor="grade_id">Grade</Label>
                <Select
                  disabled={isViewMode || isLoading}
                  onValueChange={(value) => form.setValue("grade_id", value)}
                  value={form.watch("grade_id")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(
                      (grade) => (
                        <SelectItem key={grade} value={grade.toString()}>
                          Grade {grade}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                {form.formState.errors.grade_id && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.grade_id.message}
                  </p>
                )}
              </div>

              {/* Division */}
              <div className="space-y-2">
                <Label htmlFor="division_id">Division</Label>
                <Select
                  disabled={isViewMode || isLoading}
                  onValueChange={(value: "A" | "B" | "C") =>
                    form.setValue("division_id", value)
                  }
                  value={form.watch("division_id")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select division" />
                  </SelectTrigger>
                  <SelectContent>
                    {["A", "B", "C"].map((div) => (
                      <SelectItem key={div} value={div}>
                        Division {div}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Class Mode */}
              <div className="space-y-2">
                <Label htmlFor="class_mode_id">Batch</Label>
                <Select
                  disabled={isViewMode || isLoading}
                  onValueChange={(value: "morning" | "evening") =>
                    form.setValue("class_mode_id", value)
                  }
                  value={form.watch("class_mode_id")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      { value: "morning", label: "Morning" },
                      { value: "evening", label: "Evening" },
                    ].map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Academic Year */}
              <div className="space-y-2">
                <Label htmlFor="academic_year_id">Academic Year</Label>
                <Input
                  id="academic_year_id"
                  disabled={true}
                  {...form.register("academic_year_id")}
                  value={academicYearId}
                />
              </div>

              {/* Homeroom Teacher */}
              <div className="space-y-2">
                <Label htmlFor="teacher_id">Homeroom Teacher</Label>
                <Select
                  disabled={isViewMode || isLoading}
                  onValueChange={(value) => form.setValue("teacher_id", value)}
                  value={form.watch("teacher_id")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select homeroom teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTeachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.teacher_id && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.teacher_id.message}
                  </p>
                )}
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <RadioGroup
                  disabled={isViewMode || isLoading}
                  onValueChange={(value: "active" | "inactive") =>
                    form.setValue("status", value)
                  }
                  value={form.watch("status")}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="status-active" />
                    <Label htmlFor="status-active" className="cursor-pointer">
                      Active
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inactive" id="status-inactive" />
                    <Label htmlFor="status-inactive" className="cursor-pointer">
                      Inactive
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              {!isViewMode ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/subjects")}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  {/* <Button type="submit" disabled={isLoading}>
                  {isLoading
                    ? "Saving..."
                    : mode === "ADD"
                    ? "Create Classroom"
                    : "Save Changes"}
                </Button> */}
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  onClick={() => navigate("/subjects")}
                  className="w-full sm:w-auto"
                >
                  Back to List
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Student List - Only shown in view mode */}
      {isViewMode && students.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Students in this Class</h3>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admission No.
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.admission_no}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.first_name} {student.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.gender === 'male' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-pink-100 text-pink-800'
                      }`}>
                        {student.gender.charAt(0).toUpperCase() + student.gender.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {isViewMode && students.length === 0 && (
        <div className="mt-8 text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No students found in this class.</p>
        </div>
      )}
     
    </>
  );
}
