// src/features/batches/BatchForm.tsx
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

// Define types
type Batch = {
  id?: string;
  batchName: string;
};

type BatchFormProps = {
  mode: "ADD" | "EDIT" | "VIEW";
  batchId?: string;
};

// Form validation schema
const batchFormSchema = z.object({
  batchName: z.string().min(1, "Batch name is required"),
});

type BatchFormValues = z.infer<typeof batchFormSchema>;

// Mock data functions
const fetchBatch = async (id: string): Promise<Batch> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const batch = mockBatches.find((b) => b.id === id);
      if (!batch) {
        throw new Error("Batch not found");
      }
      resolve(batch);
    }, 0);
  });
};

const createBatch = async (data: Batch): Promise<Batch> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...data, id: Math.random().toString(36).substr(2, 9) });
    }, 0);
  });
};

const updateBatch = async (id: string, data: Batch): Promise<Batch> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...data, id });
    }, 0);
  });
};

// Mock batch data
const mockBatches = [
  {
    id: "1",
    batchName: "Morning Batch",
  },
  {
    id: "2",
    batchName: "Evening Batch",
  },
];

export function BatchForm({ mode, batchId }: BatchFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(mode !== "ADD");
  const isViewMode = mode === "VIEW";

  const form = useForm<BatchFormValues>({
    resolver: zodResolver(batchFormSchema),
    defaultValues: {
      batchName: "",
    },
  });

  useEffect(() => {
    if (mode !== "ADD" && batchId) {
      const loadBatch = async () => {
        try {
          const batch = await fetchBatch(batchId);
          form.reset({
            batchName: batch.batchName,
          });
        } catch (error) {
          console.error("Failed to load batch", error);
          toast({
            title: "Error",
            description: "Failed to load batch data",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      loadBatch();
    }
  }, [mode, batchId, form, toast]);

  const onSubmit = async (formData: BatchFormValues) => {
    try {
      setIsLoading(true);
      const batchData: Batch = {
        ...formData,
        id: mode === "EDIT" && batchId ? batchId : undefined,
      };

      if (mode === "ADD") {
        await createBatch(batchData);
        toast({
          title: "Success",
          description: "Batch created successfully",
        });
      } else if (mode === "EDIT" && batchId) {
        await updateBatch(batchId, batchData);
        toast({
          title: "Success",
          description: "Batch updated successfully",
        });
      }
      navigate("/batches");
    } catch (error) {
      console.error("Error saving batch", error);
      toast({
        title: "Error",
        description: "Failed to save batch",
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
            ? "Add New Batch"
            : mode === "EDIT"
            ? "Edit Batch"
            : "Batch Details"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Batch Name Input */}
            <div className="space-y-2">
              <Label htmlFor="batchName">Batch Name</Label>
              <Input
                id="batchName"
                disabled={isViewMode || isLoading}
                {...form.register("batchName")}
                placeholder="Enter batch name"
                className="w-full"
              />
              {form.formState.errors.batchName && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.batchName.message}
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
                  onClick={() => navigate("/batches")}
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
                onClick={() => navigate("/batches")}
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
