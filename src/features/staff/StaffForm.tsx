// src/features/staff/StaffForm.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast"

// Define types
type Staff = {
  id?: string;
  user_id: string;
  name: string;
  department: string;
  designation: string;
  status: 'active' | 'inactive';
  joining_date: string;
};

type StaffFormProps = {
  mode: 'ADD' | 'EDIT' | 'VIEW';
  staffId?: string;
};


// Mock designations
const mockDesignations = [
  'Administrator',
  'Accountant',
  'Receptionist',
  'Librarian',
  'IT Support'
];

// Form validation schema
const staffFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  designation: z.string().min(1, 'Designation is required'),
  status: z.enum(['active', 'inactive']),
  department: z.string().min(1, 'Department is required'),
  joining_date: z.string().min(1, 'Joining date is required'),
});

type StaffFormValues = z.infer<typeof staffFormSchema>;

// Fetch staff by ID from mock data
const fetchStaff = async (id: string): Promise<Staff> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const staff = mockStaff.find(s => s.id === id);
      if (!staff) {
        throw new Error('Staff not found');
      }
      resolve(staff);
    }, 0);
  });
};

const createStaff = async (data: Staff): Promise<Staff> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...data, id: Math.random().toString(36).substr(2, 9) });
    }, 0);
  });
};

const updateStaff = async (id: string, data: Staff): Promise<Staff> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...data, id });
    }, 0);
  });
};

// Mock staff data
const mockStaff: Staff[] = [
  { 
    id: '1', 
    user_id: 'user_101',
    name: 'Abdul Rahman',
    department: 'Administration',
    designation: 'Principal',
    status: 'active',
    joining_date: '2018-06-15'
  },
  { 
    id: '2', 
    user_id: 'user_102',
    name: 'Aisha Mohammed',
    department: 'Administration',
    designation: 'Vice Principal',
    status: 'active',
    joining_date: '2019-03-22'
  },
];

export function StaffForm({ mode, staffId }: StaffFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(mode !== 'ADD');
  const isViewMode = mode === 'VIEW';

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: '',
      designation: '',
      status: 'active',
      department: '',
      joining_date: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (mode !== 'ADD' && staffId) {
      const loadStaff = async () => {
        try {
          const staff = await fetchStaff(staffId);
          form.reset({
            name: staff.name,
            designation: staff.designation,
            status: staff.status,
            department: staff.department,
            joining_date: staff.joining_date,
          });
        } catch (error) {
          console.error('Failed to load staff', error);
          toast({
            title: 'Error',
            description: 'Failed to load staff data',
            variant: 'destructive',
          });
        } finally {
          setIsLoading(false);
        }
      };

      loadStaff();
    }
  }, [mode, staffId, form, toast]);

  const onSubmit = async (formData: StaffFormValues) => {
    try {
      setIsLoading(true);
      const staffData: Staff = {
        ...formData,
        user_id: `user_${Date.now()}`, // Generate a unique user_id for new staff
        id: mode === 'EDIT' && staffId ? staffId : undefined
      };

      if (mode === 'ADD') {
        await createStaff(staffData);
        toast({
          title: 'Success',
          description: 'Staff created successfully',
        });
      } else if (mode === 'EDIT' && staffId) {
        await updateStaff(staffId, staffData);
        toast({
          title: 'Success',
          description: 'Staff updated successfully',
        });
      }
      navigate('/staffs/accounts');
    } catch (error) {
      console.error('Error saving staff', error);
      toast({
        title: 'Error',
        description: 'Failed to save staff',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="min-w-[calc(100vw-1000px)] max-h-[calc(100vh-200px)] overflow-auto">
      <CardHeader>
        <CardTitle>
          {mode === 'ADD' ? 'Add New Staff' : mode === 'EDIT' ? 'Edit Staff' : 'Staff Details'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col justify-between h-full">
          <div className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                disabled={isViewMode || isLoading}
                {...form.register('name')}
                placeholder="Enter full name"
                className="w-full"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                disabled={isViewMode || isLoading}
                {...form.register('department')}
                placeholder="Enter department"
                className="w-full"
              />
              {form.formState.errors.department && (
                <p className="text-sm text-red-500">{form.formState.errors.department.message}</p>
              )}
            </div>

            {/* Designation */}
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Select
                disabled={isViewMode || isLoading}
                onValueChange={(value) => form.setValue('designation', value)}
                value={form.watch('designation')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  {mockDesignations.map((designation) => (
                    <SelectItem key={designation} value={designation}>
                      {designation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.designation && (
                <p className="text-sm text-red-500">{form.formState.errors.designation.message}</p>
              )}
            </div>

            {/* Joining Date */}
            <div className="space-y-2">
              <Label htmlFor="joining_date">Joining Date</Label>
              <Input
                id="joining_date"
                type="date"
                disabled={isViewMode || isLoading}
                {...form.register('joining_date')}
                className="w-full"
              />
              {form.formState.errors.joining_date && (
                <p className="text-sm text-red-500">{form.formState.errors.joining_date.message}</p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup
                disabled={isViewMode || isLoading}
                onValueChange={(value) => form.setValue('status', value as 'active' | 'inactive')}
                value={form.watch('status')}
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
              </RadioGroup>
            </div>
          </div>

          {/* Form Actions */}
          {!isViewMode && (
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/staffs/accounts')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : mode === 'ADD' ? 'Add Staff' : 'Save Changes'}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}