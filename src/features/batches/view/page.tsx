// src/features/batches/view/page.tsx
import { useParams } from 'react-router-dom';
import { BatchForm } from '../BatchForm';

export default function ViewBatch() {
  const { id } = useParams();
  return <BatchForm mode="VIEW" batchId={id} />;
}