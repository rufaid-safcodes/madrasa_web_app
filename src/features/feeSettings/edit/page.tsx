// src/features/departments/edit/page.tsx
import { useParams } from 'react-router-dom';
import { FeeSettingsForm } from '../FeeSettingsForm';

export default function EditFeeSetting() {
  const { id } = useParams();
  return <FeeSettingsForm mode="EDIT" feeSettingId={id} />;
}