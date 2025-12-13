// src/features/students/view/page.tsx
import { useParams } from 'react-router-dom';
import { StudentForm } from '../StudentForm';

export default function ViewStudent() {
  const { id } = useParams();
  return <StudentForm mode="VIEW" studentId={id} />;
}