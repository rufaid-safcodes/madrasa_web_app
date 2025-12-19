// src/features/teachers/view/page.tsx
import { useParams } from 'react-router-dom';
import { DueFeesForm } from '../DueFeesForm';

export default function ViewDueFees() {
  const { id } = useParams();
  return <DueFeesForm mode="VIEW" dueFeesId={id} />;
}