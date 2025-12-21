// src/features/students/StudentForm.tsx
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { studentsData } from '@/lib/data';

// Define types
type Student = {
  id?: string;
  admission_no: string;
  first_name: string;
  last_name: string;
  gender: "male" | "female";
  dob: string;
  phone: string;
  guardian_name: string;
  address: string;
  admission_date: string;
  status: "active" | "inactive" | "graduated";
  academic_year_id: string;
};

type StudentFormProps = {
  mode: "ADD" | "EDIT" | "VIEW";
  studentId?: string;
};

// Mock data for academic years
const academicYears = [
  { id: "1", name: "2023-2024" },
  { id: "2", name: "2024-2025" },
  { id: "3", name: "2025-2026" },
];

// Form validation schema
const studentFormSchema = z.object({
  admission_no: z.string().min(1, "Admission number is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female"]),
  dob: z.string().min(1, "Date of birth is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  guardian_name: z.string().min(1, "Guardian name is required"),
  address: z.string().min(1, "Address is required"),
  admission_date: z.string().min(1, "Admission date is required"),
  status: z.enum(["active", "inactive", "graduated"]),
  academic_year_id: z.string().min(1, "Academic year is required"),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;

// Mock API functions
const fetchStudent = async (id: string): Promise<Student> => {
  return new Promise((resolve) => {
    // Find the student with the matching ID
    const student = studentsData.find((s) => s.id === id);
    
    if (!student) {
      throw new Error("Student not found");
    }
    // Map the student data to match the Student type
    resolve({
      id: student.id,
      admission_no: student.admission_no,
      first_name: student.first_name,
      last_name: student.last_name,
      gender: student.gender as "male" | "female",
      dob: student.dob,
      phone: student.phone,
      guardian_name: student.guardian_name,
      address: student.address,
      admission_date: student.admission_date,
      status: student.status as "active" | "inactive" | "graduated",
      academic_year_id: student.academic_year_id,
    });
  });
};

const createStudent = async (data: Student): Promise<Student> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...data, id: Math.random().toString(36).substr(2, 9) });
    }, 0);
  });
};

const updateStudent = async (id: string, data: Student): Promise<Student> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...data, id });
    }, 0);
  });
};

export function StudentForm({ mode, studentId }: StudentFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(mode !== "ADD");
  const isViewMode = mode === "VIEW";

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      admission_no: "",
      first_name: "",
      last_name: "",
      gender: "male",
      dob: "",
      phone: "",
      guardian_name: "",
      address: "",
      admission_date: new Date().toISOString().split("T")[0],
      status: "active",
      academic_year_id: "",
    },
  });

  useEffect(() => {
    if (mode !== "ADD" && studentId) {
      const loadStudent = async () => {
        try {
          const student = await fetchStudent(studentId);
          form.reset(student);
        } catch (error) {
          console.error("Failed to load student", error);
          toast({
            title: "Error",
            description: "Failed to load student data",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      loadStudent();
    }
  }, [mode, studentId, form, toast]);

  const onSubmit = async (data: StudentFormValues) => {
    try {
      setIsLoading(true);
      if (mode === "ADD") {
        await createStudent(data);
        toast({
          title: "Success",
          description: "Student created successfully",
        });
      } else if (mode === "EDIT" && studentId) {
        await updateStudent(studentId, data);
        toast({
          title: "Success",
          description: "Student updated successfully",
        });
      }
      navigate("/students");
    } catch (error) {
      console.error("Error saving student", error);
      toast({
        title: "Error",
        description: "Failed to save student",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div className="" style={{overflow:"hidden"}}>

    <Card className="min-w-[calc(100vw-1000px)] max-h-[calc(100vh-200px)] overflow-auto">
      <CardHeader>
        <CardTitle>
          {mode === "ADD"
            ? "Add New Student"
            : mode === "EDIT"
            ? "Edit Student"
            : "Student Details"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col justify-between h-full"
        >
          <div className="space-y-6">
            {/* Admission Number */}
            <div className="space-y-2">
              <Label htmlFor="admission_no">Admission Number</Label>
              <Input
                id="admission_no"
                disabled={isViewMode || isLoading}
                {...form.register("admission_no")}
                className="w-full"
              />
              {form.formState.errors.admission_no && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.admission_no.message}
                </p>
              )}
            </div>

            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                disabled={isViewMode || isLoading}
                {...form.register("first_name")}
                className="w-full"
              />
              {form.formState.errors.first_name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.first_name.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                disabled={isViewMode || isLoading}
                {...form.register("last_name")}
                className="w-full"
              />
              {form.formState.errors.last_name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.last_name.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                disabled={isViewMode || isLoading}
                onValueChange={(value) =>
                  form.setValue("gender", value as "male" | "female")
                }
                value={form.watch("gender")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="gender-male" />
                  <Label htmlFor="gender-male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="gender-female" />
                  <Label htmlFor="gender-female">Female</Label>
                </div>
              </RadioGroup>
              {form.formState.errors.gender && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.gender.message}
                </p>
                  
              )}
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                disabled={isViewMode || isLoading}
                {...form.register("dob")}
                className="w-full"
              />
              {form.formState.errors.dob && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.dob.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                disabled={isViewMode || isLoading}
                {...form.register("phone")}
                className="w-full"
              />
              {form.formState.errors.phone && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>

            {/* Guardian Name */}
            <div className="space-y-2">
              <Label htmlFor="guardian_name">Guardian Name</Label>
              <Input
                id="guardian_name"
                disabled={isViewMode || isLoading}
                {...form.register("guardian_name")}
                className="w-full"
              />
              {form.formState.errors.guardian_name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.guardian_name.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                disabled={isViewMode || isLoading}
                {...form.register("address")}
                className="w-full"
              />
              {form.formState.errors.address && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.address.message}
                </p>
              )}
            </div>

            {/* Admission Date */}
            <div className="space-y-2">
              <Label htmlFor="admission_date">Admission Date</Label>
              <Input
                id="admission_date"
                type="date"
                disabled={isViewMode || isLoading}
                {...form.register("admission_date")}
                className="w-full"
              />
              {form.formState.errors.admission_date && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.admission_date.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup
                disabled={isViewMode || isLoading}
                onValueChange={(value) =>
                  form.setValue(
                    "status",
                    value as "active" | "inactive" | "graduated"
                  )
                }
                value={form.watch("status")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="status-active" />
                  <Label htmlFor="status-active">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inactive" id="status-inactive" />
                  <Label htmlFor="status-inactive">Inactive</Label>
                </div>
                {/* <div className="flex items-center space-x-2">
                  <RadioGroupItem value="graduated" id="status-graduated" />
                  <Label htmlFor="status-graduated">Graduated</Label>
                </div> */}
              </RadioGroup>
              {form.formState.errors.status && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.status.message}
                </p>
              )}
            </div>

            {/* Academic Year */}
            <div className="space-y-2">
              <Label>Academic Year</Label>
              <Select
                disabled={isViewMode || isLoading}
                onValueChange={(value) =>
                  form.setValue("academic_year_id", value)
                }
                value={form.watch("academic_year_id")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select academic year" />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((year) => (
                    <SelectItem key={year.id} value={year.id}>
                      {year.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.academic_year_id && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.academic_year_id.message}
                </p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            {!isViewMode ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  onClick={() => navigate("/students")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={() => navigate("/students")}
                className="w-full sm:w-auto"
              >
                Back to List
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
    // </div>
  );
}
