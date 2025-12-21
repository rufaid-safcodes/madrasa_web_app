import { ClassRoomForm } from "../components/ClassRoomForm";

export default function AddClassRoom() {
  return (
    <div className="flex items-center justify-center w-full p-4">
      <ClassRoomForm mode="ADD" />
    </div>
  );
}
