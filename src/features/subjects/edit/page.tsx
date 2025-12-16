// src/features/teachers/edit/page.tsx
import { useParams } from 'react-router-dom';
import { SubjectForm } from '../SubjectForm';

export default function EditSubject() {
  const { id } = useParams();
  return <SubjectForm mode="EDIT" subjectId={id} />;
}