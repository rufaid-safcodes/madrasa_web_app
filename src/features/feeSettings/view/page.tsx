// src/features/departments/view/page.tsx
import { useParams } from 'react-router-dom';

import { FeeSettingsForm } from '../FeeSettingsForm';

export default function ViewFeeSetting() {
  const { id } = useParams();
  return <FeeSettingsForm mode="VIEW" feeSettingId={id} />;
}