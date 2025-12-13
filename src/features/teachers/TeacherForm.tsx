// src/features/teachers/TeacherForm.tsx
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
type Teacher = {
  id?: string;
  user_id: string;
  department_id: string;
  qualification: string;
  joining_date: string;
  status: 'active' | 'inactive';
};

type TeacherFormProps = {
  mode: 'ADD' | 'EDIT' | 'VIEW';
  teacherId?: string;
};

// Mock data for users and departments
// const mockUsers = [
//   { id: '1', name: 'John Doe', email: 'john@example.com' },
//   { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
// ];

const mockDepartments = [
  { id: '1', name: 'Computer Science' },
  { id: '2', name: 'Mathematics' },
  { id: '3', name: 'Science' },
];

// Form validation schema
const teacherFormSchema = z.object({
  user_id: z.string().min(1, 'Please select a teacher'),
  department_id: z.string().min(1, 'Please select a department'),
  qualification: z.string().min(1, 'Qualification is required'),
  joining_date: z.string().min(1, 'Joining date is required'),
  status: z.enum(['active', 'inactive']),
});

type TeacherFormValues = z.infer<typeof teacherFormSchema>;

// Mock API functions
const fetchTeacher = async (id: string): Promise<Teacher> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        user_id: '1',
        department_id: '1',
        qualification: 'PhD in Computer Science',
        joining_date: '2023-01-01',
        status: 'active',
      });
    }, 500);
  });
};

const createTeacher = async (data: Teacher): Promise<Teacher> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...data, id: Math.random().toString(36).substr(2, 9) });
    }, 500);
  });
};

const updateTeacher = async (id: string, data: Teacher): Promise<Teacher> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...data, id });
    }, 500);
  });
};

export function TeacherForm({ mode, teacherId }: TeacherFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(mode !== 'ADD');
  const isViewMode = mode === 'VIEW';

  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      user_id: '',
      department_id: '',
      qualification: '',
      joining_date: '',
      status: 'active',
    },
  });

  useEffect(() => {
    if (mode !== 'ADD' && teacherId) {
      const loadTeacher = async () => {
        try {
          const teacher = await fetchTeacher(teacherId);
          form.reset({
            user_id: teacher.user_id,
            department_id: teacher.department_id,
            qualification: teacher.qualification,
            joining_date: teacher.joining_date,
            status: teacher.status,
          });
        } catch (error) {
          console.error('Failed to load teacher', error);
          toast({
            title: 'Error',
            description: 'Failed to load teacher data',
            variant: 'destructive',
          });
        } finally {
          setIsLoading(false);
        }
      };

      loadTeacher();
    }
  }, [mode, teacherId, form]);

  const onSubmit = async (data: TeacherFormValues) => {
    try {
      setIsLoading(true);
      if (mode === 'ADD') {
        await createTeacher(data);
        toast({
          title: 'Success',
          description: 'Teacher created successfully',
        });
      } else if (mode === 'EDIT' && teacherId) {
        await updateTeacher(teacherId, data);
        toast({
          title: 'Success',
          description: 'Teacher updated successfully',
        });
      }
      navigate('/teachers');
    } catch (error) {
      console.error('Error saving teacher', error);
      toast({
        title: 'Error',
        description: 'Failed to save teacher',
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
          {mode === 'ADD' ? 'Add New Teacher' : mode === 'EDIT' ? 'Edit Teacher' : 'Teacher Details'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col justify-between h-full">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-auto">
            {/* User Select */}
            <div className="space-y-2">
              <Label htmlFor="user_id">Teacher</Label>

              <Input
                id="qualification"
                disabled={isViewMode || isLoading}
                {...form.register('user_id')}
              />
              {form.formState.errors.user_id && (
                <p className="text-sm text-red-500">{form.formState.errors.user_id.message}</p>
              )}
            </div>

            {/* Department Select */}
            <div className="space-y-2">
              <Label htmlFor="department_id">Department</Label>
              <Select
                disabled={isViewMode || isLoading}
                onValueChange={(value) => form.setValue('department_id', value)}
                value={form.watch('department_id')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {mockDepartments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.department_id && (
                <p className="text-sm text-red-500">{form.formState.errors.department_id.message}</p>
              )}
            </div>

            {/* Qualification */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                disabled={isViewMode || isLoading}
                {...form.register('qualification')}
              />
              {form.formState.errors.qualification && (
                <p className="text-sm text-red-500">{form.formState.errors.qualification.message}</p>
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
              {form.formState.errors.status && (
                <p className="text-sm text-red-500">{form.formState.errors.status.message}</p>
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
                  onClick={() => navigate('/teachers')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={() => navigate('/teachers')}
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