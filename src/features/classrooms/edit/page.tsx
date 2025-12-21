// src/features/teachers/edit/page.tsx
import { useParams } from 'react-router-dom';
import { ClassRoomForm } from '../components/ClassRoomForm';

export default function EditClassRoom() {
  const { id } = useParams();
  return <ClassRoomForm mode="EDIT" classRoomId={id} />;
}