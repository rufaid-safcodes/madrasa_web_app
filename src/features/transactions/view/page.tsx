// src/features/teachers/view/page.tsx
import { useParams } from 'react-router-dom';
import { TransactionForm } from '../TransactionForm';

export default function ViewTransaction() {
  const { id } = useParams();
  return <TransactionForm mode="VIEW" transactionId={id} />;
}