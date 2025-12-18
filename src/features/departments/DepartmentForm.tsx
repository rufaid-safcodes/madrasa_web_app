import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { departmentsData } from "@/lib/data";

// Define types
type Department = {
  id?: string;
  name: string;
};

type DepartmentFormProps = {
  mode: "ADD" | "EDIT" | "VIEW";
  departmentId?: string;
};

// Form validation schema
const departmentFormSchema = z.object({
  name: z.string().min(1, "Department name is required"),
});

type DepartmentFormValues = z.infer<typeof departmentFormSchema>;

// Mock data functions
const fetchDepartment = async (id: string): Promise<Department> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const department = departmentsData.find((d) => d.id === id);
      if (!department) {
        throw new Error("Department not found");
      }
      resolve(department);
    }, 0);
  });
};

const createDepartment = async (data: Department): Promise<Department> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDepartment = { 
        ...data, 
        id: Math.random().toString(36).substr(2, 9) 
      };
      departmentsData.push(newDepartment);
      resolve(newDepartment);
    }, 0);
  });
};

const updateDepartment = async (id: string, data: Department): Promise<Department> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = departmentsData.findIndex(d => d.id === id);
      if (index !== -1) {
        departmentsData[index] = { ...data, id };
      }
      resolve({ ...data, id });
    }, 0);
  });
};

export function DepartmentForm({ mode, departmentId }: DepartmentFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(mode !== "ADD");
  const isViewMode = mode === "VIEW";

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (mode !== "ADD" && departmentId) {
      const loadDepartment = async () => {
        try {
          const department = await fetchDepartment(departmentId);
          form.reset({
            name: department.name,
          });
        } catch (error) {
          console.error("Failed to load department", error);
          toast({
            title: "Error",
            description: "Failed to load department data",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      loadDepartment();
    }
  }, [mode, departmentId, form, toast]);

  const onSubmit = async (formData: DepartmentFormValues) => {
    try {
      setIsLoading(true);
      const departmentData: Department = {
        ...formData,
        id: mode === "EDIT" && departmentId ? departmentId : undefined,
      };

      if (mode === "ADD") {
        await createDepartment(departmentData);
        toast({
          title: "Success",
          description: "Department created successfully",
        });
      } else if (mode === "EDIT" && departmentId) {
        await updateDepartment(departmentId, departmentData);
        toast({
          title: "Success",
          description: "Department updated successfully",
        });
      }
      navigate("/departments");
    } catch (error) {
      console.error("Error saving department", error);
      toast({
        title: "Error",
        description: "Failed to save department",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="min-w-[calc(100vw-1000px)] max-h-[calc(100vh-200px)] overflow-auto">
      <CardHeader>
        <CardTitle>
          {mode === "ADD"
            ? "Add New Department"
            : mode === "EDIT"
            ? "Edit Department"
            : "Department Details"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Department Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name">Department Name</Label>
              <Input
                id="name"
                disabled={isViewMode || isLoading}
                {...form.register("name")}
                placeholder="Enter department name"
                className="w-full"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
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
                  onClick={() => navigate("/departments")}
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
                onClick={() => navigate("/departments")}
                className="w-full sm:w-auto"
              >
                Back to List
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}