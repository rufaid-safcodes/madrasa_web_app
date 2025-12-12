// src/features/teachers/edit/page.tsx
import { useParams } from 'react-router-dom';
import { TeacherForm } from '../TeacherForm';

export default function EditTeacher() {
  const { id } = useParams();
  return <TeacherForm mode="EDIT" teacherId={id} />;
}