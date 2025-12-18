// src/features/teachers/edit/page.tsx
import { useParams } from 'react-router-dom';
import { BatchForm } from '../BatchForm';

export default function EditBatch() {
  const { id } = useParams();
  return <BatchForm mode="EDIT" batchId={id} />;
}