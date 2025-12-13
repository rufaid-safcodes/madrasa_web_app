// src/features/teachers/add/page.tsx
import { TeacherForm } from '../TeacherForm';

export default function AddTeacher() {
  return <div className='flex items-center justify-center w-full'>
    <TeacherForm mode="ADD" />
  </div>
}