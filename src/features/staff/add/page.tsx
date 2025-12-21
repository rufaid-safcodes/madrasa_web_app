// src/features/teachers/add/page.tsx
import { StaffForm } from "../components/StaffForm";

export default function AddStaff() {
  return (
    <div className="flex items-center justify-center w-full">
      <StaffForm mode="ADD" />
    </div>
  );
}
