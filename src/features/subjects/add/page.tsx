import { SubjectForm } from "../SubjectForm";

export function AddSubjects() {
  return (
    <div className="flex items-center justify-center w-full">
      <SubjectForm mode="ADD" />
    </div>
  );
}

export default AddSubjects;
