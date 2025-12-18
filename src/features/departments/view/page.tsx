// src/features/departments/view/page.tsx
import { useParams } from 'react-router-dom';
import { DepartmentForm } from '../DepartmentForm';

export default function ViewDepartment() {
  const { id } = useParams();
  return <DepartmentForm mode="VIEW" departmentId={id} />;
}