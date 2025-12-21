import { StudentForm } from "../StudentForm";

export function AddStudents() {
  return (
    <div className="w-full h-[calc(100vh-180px)] overflow-auto">
      <StudentForm mode="ADD" />
    </div>
  );
}

export default AddStudents;
