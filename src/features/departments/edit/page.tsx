// src/features/departments/edit/page.tsx
import { useParams } from 'react-router-dom';
import { DepartmentForm } from '../DepartmentForm';

export default function EditDepartment() {
  const { id } = useParams();
  return <DepartmentForm mode="EDIT" departmentId={id} />;
}