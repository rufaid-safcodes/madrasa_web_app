// src/features/batches/add/page.tsx
import { BatchForm } from "../BatchForm";

export default function AddBatch() {
  return (
    <div className="flex items-center justify-center w-full">
      <BatchForm mode="ADD" />
    </div>
  );
}
