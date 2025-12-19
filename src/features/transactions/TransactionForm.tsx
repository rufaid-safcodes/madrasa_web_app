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
import { transactionData } from "@/lib/data";
import type { Transaction } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define types
type TransactionFormProps = {
  mode: "ADD" | "EDIT" | "VIEW";
  transactionId?: string;
};

// Form validation schema
const transactionFormSchema = z.object({
  date: z.string().min(1, "Date is required"),
  name: z.string().min(1, "Student name is required"),
  studentId: z.string().min(1, "Student ID is required"),
  amount: z.string().min(1, "Amount is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Amount must be a positive number"
  ),
  paymentType: z.enum(["cash", "card"] as const).describe("Please select a payment type"),
});

type TransactionFormValues = z.infer<typeof transactionFormSchema>;

// Mock data functions
const fetchTransaction = async (id: string): Promise<Transaction> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transaction = transactionData.find((t) => t.id === id);
      if (!transaction) {
        throw new Error("Transaction not found");
      }
      resolve(transaction);
    }, 0);
  });
};

const createTransaction = async (data: TransactionFormValues): Promise<Transaction> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTransaction: Transaction = { 
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        amount: parseFloat(data.amount)
      };
      transactionData.push(newTransaction);
      resolve(newTransaction);
    }, 0);
  });
};

const updateTransaction = async (id: string, data: TransactionFormValues): Promise<Transaction> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = transactionData.findIndex(t => t.id === id);
      const updatedTransaction = {
        ...data,
        id,
        amount: parseFloat(data.amount)
      };
      if (index !== -1) {
        transactionData[index] = updatedTransaction;
      }
      resolve(updatedTransaction);
    }, 0);
  });
};

export function TransactionForm({ mode, transactionId }: TransactionFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(mode !== "ADD");
  const isViewMode = mode === "VIEW";

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0], // Default to today's date
      name: "",
      studentId: "",
      amount: "",
      paymentType: "cash",
    },
  });

  useEffect(() => {
    if (mode !== "ADD" && transactionId) {
      const loadTransaction = async () => {
        try {
          const transaction = await fetchTransaction(transactionId);
          form.reset({
            ...transaction,
            amount: transaction.amount.toString(),
          });
        } catch (error) {
          console.error("Failed to load transaction", error);
          toast({
            title: "Error",
            description: "Failed to load transaction data",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      loadTransaction();
    }
  }, [mode, transactionId, form, toast]);

  const onSubmit = async (formData: TransactionFormValues) => {
    try {
      setIsLoading(true);

      if (mode === "ADD") {
        await createTransaction(formData);
        toast({
          title: "Success",
          description: "Transaction created successfully",
        });
      } else if (mode === "EDIT" && transactionId) {
        await updateTransaction(transactionId, formData);
        toast({
          title: "Success",
          description: "Transaction updated successfully",
        });
      }
      navigate("/transactions");
    } catch (error) {
      console.error("Error saving transaction", error);
      toast({
        title: "Error",
        description: "Failed to save transaction",
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
            ? "Add New Transaction"
            : mode === "EDIT"
            ? "Edit Transaction"
            : "Transaction Details"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Input */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                disabled={isViewMode || isLoading}
                {...form.register("date")}
                className="w-full"
              />
              {form.formState.errors.date && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>

            {/* Student Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name">Student Name</Label>
              <Input
                id="name"
                disabled={isViewMode || isLoading}
                {...form.register("name")}
                placeholder="Enter student name"
                className="w-full"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

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

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  disabled={isViewMode || isLoading}
                  {...form.register("amount")}
                  placeholder="0.00"
                  className="w-full pl-7"
                />
              </div>
              {form.formState.errors.amount && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.amount.message}
                </p>
              )}
            </div>

            {/* Payment Type Select */}
            <div className="space-y-2">
              <Label htmlFor="paymentType">Payment Type</Label>
              <Select
                disabled={isViewMode || isLoading}
                onValueChange={(value: "cash" | "card") => 
                  form.setValue("paymentType", value, { shouldValidate: true })
                }
                value={form.watch("paymentType")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.paymentType && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.paymentType.message}
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
                  onClick={() => navigate("/transactions")}
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
                onClick={() => navigate("/transactions")}
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