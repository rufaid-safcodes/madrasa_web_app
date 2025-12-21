import { StudentForm } from "../StudentForm";

export function AddStudents() {
  return (
    // <div className="w-full h-[calc(100vh-180px)] overflow-auto">
    <div className="flex items-center justify-center w-full">
      <StudentForm mode="ADD" />
    </div>
  );
}

export default AddStudents;
