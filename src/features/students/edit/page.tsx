// src/features/teachers/edit/page.tsx
import { useParams } from 'react-router-dom';
import { StudentForm } from '../components/StudentForm';

export default function EditStudent() {
  const { id } = useParams();
  return <StudentForm mode="EDIT" studentId={id} />;
}