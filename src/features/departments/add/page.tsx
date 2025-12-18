// src/features/departments/add/page.tsx
import { DepartmentForm } from "../DepartmentForm";

export default function AddDepartment() {
  return (
    <div className="flex items-center justify-center w-full">
      <DepartmentForm mode="ADD" />
    </div>
  );
}
