// src/features/teachers/edit/page.tsx
import { useParams } from 'react-router-dom';
import { StaffForm } from '../components/StaffForm';

export default function EditStaff() {
  const { id } = useParams();
  return <StaffForm mode="EDIT" staffId={id} />;
}