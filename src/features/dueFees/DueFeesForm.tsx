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
import { dueFeesData } from "@/lib/data";
import type { DueFee } from "@/lib/data";

// Define types
type DueFeesFormProps = {
  mode: "ADD" | "EDIT" | "VIEW";
  dueFeesId?: string;
};

// Form validation schema
const dueFeesFormSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  studentName: z.string().min(1, "Student name is required"),
  className: z.string().min(1, "Class is required"),
  siblingId: z.string().optional(),
  feeAmount: z.string().min(1, "Fee amount is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Amount must be a positive number"
  ),
  dueMonths: z.string().min(1, "Due months is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Must be a positive number"
  ),
  lastPaidDate: z.string().min(1, "Last paid date is required"),
  totalDue: z.string().min(1, "Total due is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 0,
    "Must be a positive number"
  ),
});

type DueFeesFormValues = z.infer<typeof dueFeesFormSchema>;

// Mock data functions
const fetchDueFee = async (id: string): Promise<DueFee> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dueFee = dueFeesData.find((d) => d.id === id);
      if (!dueFee) {
        throw new Error("Due fee record not found");
      }
      resolve(dueFee);
    }, 0);
  });
};

const createDueFee = async (data: DueFeesFormValues): Promise<DueFee> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDueFee: DueFee = { 
        ...data,
        id: `df${dueFeesData.length + 1}`,
        feeAmount: parseFloat(data.feeAmount),
        dueMonths: parseInt(data.dueMonths, 10),
        totalDue: parseFloat(data.totalDue),
        siblingId: data.siblingId || undefined
      };
      dueFeesData.push(newDueFee);
      resolve(newDueFee);
    }, 0);
  });
};

const updateDueFee = async (id: string, data: DueFeesFormValues): Promise<DueFee> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = dueFeesData.findIndex(d => d.id === id);
      const updatedDueFee = {
        ...data,
        id,
        feeAmount: parseFloat(data.feeAmount),
        dueMonths: parseInt(data.dueMonths, 10),
        totalDue: parseFloat(data.totalDue),
        siblingId: data.siblingId || undefined
      } as DueFee;
      
      if (index !== -1) {
        dueFeesData[index] = updatedDueFee;
      }
      resolve(updatedDueFee);
    }, 0);
  });
};

export function DueFeesForm({ mode, dueFeesId }: DueFeesFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(mode !== "ADD");
  const isViewMode = mode === "VIEW";

  const form = useForm<DueFeesFormValues>({
    resolver: zodResolver(dueFeesFormSchema),
    defaultValues: {
      studentId: "",
      studentName: "",
      className: "",
      siblingId: "",
      feeAmount: "",
      dueMonths: "1",
      lastPaidDate: new Date().toISOString().split('T')[0],
      totalDue: "0"
    },
  });

  // Calculate total due when fee amount or due months change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if ((name === 'feeAmount' || name === 'dueMonths') && value.feeAmount && value.dueMonths) {
        const amount = parseFloat(value.feeAmount) || 0;
        const months = parseInt(value.dueMonths, 10) || 0;
        const total = (amount * months).toFixed(2);
        form.setValue('totalDue', total, { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    if (mode !== "ADD" && dueFeesId) {
      const loadDueFee = async () => {
        try {
          const dueFee = await fetchDueFee(dueFeesId);
          form.reset({
            ...dueFee,
            feeAmount: dueFee.feeAmount.toString(),
            dueMonths: dueFee.dueMonths.toString(),
            totalDue: dueFee.totalDue.toString(),
            siblingId: dueFee.siblingId || ""
          });
        } catch (error) {
          console.error("Failed to load due fee record", error);
          toast({
            title: "Error",
            description: "Failed to load due fee record",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      loadDueFee();
    }
  }, [mode, dueFeesId, form, toast]);

  const onSubmit = async (formData: DueFeesFormValues) => {
    try {
      setIsLoading(true);

      if (mode === "ADD") {
        await createDueFee(formData);
        toast({
          title: "Success",
          description: "Due fee record created successfully",
        });
      } else if (mode === "EDIT" && dueFeesId) {
        await updateDueFee(dueFeesId, formData);
        toast({
          title: "Success",
          description: "Due fee record updated successfully",
        });
      }
      navigate("/due-fees");
    } catch (error) {
      console.error("Error saving due fee record", error);
      toast({
        title: "Error",
        description: "Failed to save due fee record",
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
            ? "Add New Due Fee Record"
            : mode === "EDIT"
            ? "Edit Due Fee Record"
            : "Due Fee Details"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student ID Input */}
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                disabled={isViewMode || isLoading}
                {...form.register("studentId")}
                placeholder="Enter student ID"
                className="w-full"
              />
              {form.formState.errors.studentId && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.studentId.message}
                </p>
              )}
            </div>

            {/* Student Name Input */}
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                disabled={isViewMode || isLoading}
                {...form.register("studentName")}
                placeholder="Enter student name"
                className="w-full"
              />
              {form.formState.errors.studentName && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.studentName.message}
                </p>
              )}
            </div>

            {/* Class Name Input */}
            <div className="space-y-2">
              <Label htmlFor="className">Class</Label>
              <Input
                id="className"
                disabled={isViewMode || isLoading}
                {...form.register("className")}
                placeholder="e.g., Class 1A"
                className="w-full"
              />
              {form.formState.errors.className && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.className.message}
                </p>
              )}
            </div>

            {/* Sibling ID Input */}
            <div className="space-y-2">
              <Label htmlFor="siblingId">Sibling ID (Optional)</Label>
              <Input
                id="siblingId"
                disabled={isViewMode || isLoading}
                {...form.register("siblingId")}
                placeholder="Enter sibling ID if any"
                className="w-full"
              />
              {form.formState.errors.siblingId && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.siblingId.message}
                </p>
              )}
            </div>

            {/* Fee Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="feeAmount">Monthly Fee</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input
                  id="feeAmount"
                  type="number"
                  step="0.01"
                  disabled={isViewMode || isLoading}
                  {...form.register("feeAmount")}
                  placeholder="0.00"
                  className="w-full pl-7"
                />
              </div>
              {form.formState.errors.feeAmount && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.feeAmount.message}
                </p>
              )}
            </div>

            {/* Due Months Input */}
            <div className="space-y-2">
              <Label htmlFor="dueMonths">Due Months</Label>
              <Input
                id="dueMonths"
                type="number"
                min="1"
                disabled={isViewMode || isLoading}
                {...form.register("dueMonths")}
                placeholder="Number of months due"
                className="w-full"
              />
              {form.formState.errors.dueMonths && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.dueMonths.message}
                </p>
              )}
            </div>

            {/* Last Paid Date Input */}
            <div className="space-y-2">
              <Label htmlFor="lastPaidDate">Last Paid Date</Label>
              <Input
                id="lastPaidDate"
                type="date"
                disabled={isViewMode || isLoading}
                {...form.register("lastPaidDate")}
                className="w-full"
              />
              {form.formState.errors.lastPaidDate && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.lastPaidDate.message}
                </p>
              )}
            </div>

            {/* Total Due (Auto-calculated) */}
            <div className="space-y-2">
              <Label htmlFor="totalDue">Total Due</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input
                  id="totalDue"
                  type="number"
                  step="0.01"
                  disabled={true}
                  {...form.register("totalDue")}
                  className="w-full pl-7 bg-gray-100"
                />
              </div>
              {form.formState.errors.totalDue && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.totalDue.message}
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
                  onClick={() => navigate("/due-fees")}
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
                onClick={() => navigate("/due-fees")}
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