// src/features/teachers/view/page.tsx
import { useParams } from 'react-router-dom';
import { StaffForm } from '../components/StaffForm';

export default function ViewStaff() {
  const { id } = useParams();
  return <StaffForm mode="VIEW" staffId={id} />;
}