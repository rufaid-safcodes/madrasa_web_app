// create a form component for fee settings

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
import { feeSettingsData } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define types
type FeeSetting = {
  id?: string;
  classroom_id: string;
  amount: number;
  academic_year_id: string;
};

type FeeSettingsFormProps = {
  mode: "ADD" | "EDIT" | "VIEW";
  feeSettingId?: string;
};

// Form validation schema
const feeSettingsFormSchema = z.object({
  classroom_id: z.string().min(1, "Classroom is required"),
  amount: z.number().min(0, "Amount must be a positive number"),
  academic_year_id: z.string().min(1, "Academic year is required"),
});

type FeeSettingsFormValues = z.infer<typeof feeSettingsFormSchema>;

// Mock data functions
const fetchFeeSetting = async (id: string): Promise<FeeSetting> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const feeSetting = feeSettingsData.find((f) => f.id === id);
      if (!feeSetting) {
        throw new Error("Fee setting not found");
      }
      resolve(feeSetting);
    }, 0);
  });
};

const createFeeSetting = async (data: FeeSetting): Promise<FeeSetting> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newFeeSetting = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
      };
      feeSettingsData.push(newFeeSetting);
      resolve(newFeeSetting);
    }, 0);
  });
};

const updateFeeSetting = async (
  id: string,
  data: FeeSetting
): Promise<FeeSetting> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = feeSettingsData.findIndex((f) => f.id === id);
      if (index !== -1) {
        feeSettingsData[index] = { ...data, id };
      }
      resolve({ ...data, id });
    }, 0);
  });
};

export function FeeSettingsForm({ mode, feeSettingId }: FeeSettingsFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(mode !== "ADD");
  const isViewMode = mode === "VIEW";

  const form = useForm<FeeSettingsFormValues>({
    resolver: zodResolver(feeSettingsFormSchema),
    defaultValues: {
      classroom_id: "",
      amount: 0,
      academic_year_id: "2023-2024", // Default to current academic year
    },
  });

  useEffect(() => {
    if (mode !== "ADD" && feeSettingId) {
      const loadFeeSetting = async () => {
        try {
          const feeSetting = await fetchFeeSetting(feeSettingId);
          form.reset({
            classroom_id: feeSetting.classroom_id,
            amount: feeSetting.amount,
            academic_year_id: feeSetting.academic_year_id,
          });
        } catch (error) {
          console.error("Failed to load fee setting", error);
          toast({
            title: "Error",
            description: "Failed to load fee setting data",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      loadFeeSetting();
    }
  }, [mode, feeSettingId, form, toast]);

  const onSubmit = async (formData: FeeSettingsFormValues) => {
    try {
      setIsLoading(true);
      const feeSettingData: FeeSetting = {
        ...formData,
        id: mode === "EDIT" && feeSettingId ? feeSettingId : undefined,
      };

      if (mode === "ADD") {
        await createFeeSetting(feeSettingData);
        toast({
          title: "Success",
          description: "Fee setting created successfully",
        });
      } else if (mode === "EDIT" && feeSettingId) {
        await updateFeeSetting(feeSettingId, feeSettingData);
        toast({
          title: "Success",
          description: "Fee setting updated successfully",
        });
      }
      navigate("/fee-settings");
    } catch (error) {
      console.error("Error saving fee setting", error);
      toast({
        title: "Error",
        description: "Failed to save fee setting",
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
            ? "Add New Fee Setting"
            : mode === "EDIT"
            ? "Edit Fee Setting"
            : "Fee Setting Details"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Classroom ID Input */}
            <div className="space-y-2">
              <Label htmlFor="classroom_id">Classroom ID</Label>
              <Input
                id="classroom_id"
                disabled={isViewMode || isLoading}
                {...form.register("classroom_id")}
                placeholder="Enter classroom ID"
                className="w-full"
              />
              {form.formState.errors.classroom_id && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.classroom_id.message}
                </p>
              )}
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                disabled={isViewMode || isLoading}
                {...form.register("amount", { valueAsNumber: true })}
                placeholder="Enter amount"
                className="w-full"
              />
              {form.formState.errors.amount && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.amount.message}
                </p>
              )}
            </div>

            {/* Academic Year Input */}
            <div className="space-y-2">
              <Label htmlFor="academic_year_id">Academic Year</Label>
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
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2025-2026">2025-2026</SelectItem>
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
                  onClick={() => navigate("/fee-settings")}
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
                onClick={() => navigate("/fee-settings")}
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
