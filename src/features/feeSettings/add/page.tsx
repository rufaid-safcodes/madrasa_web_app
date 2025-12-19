// src/features/feeSettings/add/page.tsx
import { FeeSettingsForm } from "../FeeSettingsForm";

export default function AddFeeSetting() {
  return (
    <div className="flex items-center justify-center w-full">
      <FeeSettingsForm mode="ADD" />
    </div>
  );
}
