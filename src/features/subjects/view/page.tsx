// src/features/students/view/page.tsx
import { useParams } from 'react-router-dom';
import { SubjectForm } from '../SubjectForm';

export default function ViewSubject() {
  const { id } = useParams();
  return <SubjectForm mode="VIEW" subjectId={id} />;
}