import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
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
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { subjectsData } from "@/lib/data";

// Define types
type Subject = {
  id: string;
  subject_name: string;
  department_id: string;
  status: "active" | "inactive" | "graduated";  // Add "graduated" here
};

type SubjectFormProps = {
  mode: "ADD" | "EDIT" | "VIEW";
  subjectId?: string;
};

// Mock data for departments
const departments = [
  { id: "dept-001", name: "Quran" },
  { id: "dept-002", name: "Hadith" },
  { id: "dept-003", name: "Fiqh" },
  { id: "dept-004", name: "Arabic" },
  { id: "dept-005", name: "Islamic Studies" },
];

// Form validation schema
const subjectFormSchema = z.object({
  subject_name: z.string().min(1, "Subject name is required"),
  department_id: z.string().min(1, "Department is required"),
  status: z.enum(["active", "inactive", "graduated"]),
});

type SubjectFormValues = z.infer<typeof subjectFormSchema>;

// Mock API functions
const fetchSubject = async (id: string): Promise<Subject> => {
  const subject = subjectsData.find((s) => s.id === id);

  if (!subject) {
    throw new Error("Subject not found");
  }

  return {
    id: subject.id,
    subject_name: subject.subject_name,
    department_id: subject.department_id,
    status: "active",
  };
};

const createSubject = async (data: Omit<Subject, "id">): Promise<Subject> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSubject: Subject = {
        ...data,
        id: `sub-${Math.random().toString(36).substr(2, 8)}`,
      };
      resolve(newSubject);
    }, 500);
  });
};

const updateSubject = async (
  id: string,
  data: Omit<Subject, "id">
): Promise<Subject> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedSubject: Subject = { id, ...data };
      resolve(updatedSubject);
    }, 500);
  });
};

export function SubjectForm({ mode = "ADD", subjectId }: SubjectFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(mode !== "ADD");
  const isViewMode = mode === "VIEW";
  const params = useParams();

  const effectiveSubjectId = subjectId || params.id;

  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {
      subject_name: "",
      department_id: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (mode !== "ADD" && effectiveSubjectId) {
      const loadSubject = async () => {
        try {
          const subject = await fetchSubject(effectiveSubjectId);
          form.reset({
            subject_name: subject.subject_name,
            department_id: subject.department_id,
            status: subject.status,
          });
        } catch (error) {
          console.error("Failed to load subject", error);
          toast({
            title: "Error",
            description: "Failed to load subject data",
            variant: "destructive",
          });
          navigate("/subjects");
        } finally {
          setIsLoading(false);
        }
      };

      loadSubject();
    } else {
      setIsLoading(false);
    }
  }, [mode, effectiveSubjectId, form, toast, navigate]);

  const onSubmit: SubmitHandler<SubjectFormValues> = async (data) => {
    try {
      setIsLoading(true);

      if (mode === "ADD") {
        await createSubject(data);
        toast({
          title: "Success",
          description: "Subject created successfully",
        });
      } else if (mode === "EDIT" && effectiveSubjectId) {
        await updateSubject(effectiveSubjectId, data);
        toast({
          title: "Success",
          description: "Subject updated successfully",
        });
      }

      navigate("/subjects");
    } catch (error) {
      console.error("Error saving subject", error);
      toast({
        title: "Error",
        description: "Failed to save subject",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">Loading...</div>
    );
  }

  return (
    <Card className="min-w-[calc(100vw-1000px)] max-h-[calc(100vh-200px)] overflow-auto">
      <CardHeader>
        <CardTitle>
          {mode === "ADD"
            ? "Add New Subject"
            : mode === "EDIT"
            ? "Edit Subject"
            : "Subject Details"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Subject Name */}
          <div className="space-y-2">
            <Label htmlFor="subject_name">Subject Name</Label>
            <Input
              id="subject_name"
              disabled={isViewMode || isLoading}
              placeholder="Enter subject name"
              {...form.register("subject_name")}
              className="w-full"
            />
            {form.formState.errors.subject_name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.subject_name.message}
              </p>
            )}
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department_id">Department</Label>
            <Select
              disabled={isViewMode || isLoading}
              onValueChange={(value) => form.setValue("department_id", value)}
              value={form.watch("department_id")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.department_id && (
              <p className="text-sm text-red-500">
                {form.formState.errors.department_id.message}
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

          {/* Buttons */}
          {!isViewMode && (
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/subjects")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Saving..."
                  : mode === "ADD"
                  ? "Create Subject"
                  : "Save Changes"}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
