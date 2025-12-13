import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/shared/app-sidebar"
import { Toaster } from "@/components/ui/toaster"

import Dashboard from "@/features/dashboard/page"
import Attendance from "@/features/attendance/page"
import Payments from "./features/payments/page"
import Staffs from "./features/staff/page"
import Students from "./features/students/page"
import Teachers from "./features/teachers/page"
import ClassRooms from "./features/classrooms/page"
import AddStudents from "./features/students/add/page"
import BulkUploadStudents from "./features/students/bulk-upload/page"
import AddTeachers from "./features/teachers/add/page"
import ViewTeacher from "./features/teachers/view/page"
import EditTeacher from "./features/teachers/edit/page"

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />

        <main className="w-full bg-[#f1f1f1]">
          {/* <nav className="flex gap-4">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <Link to="/about" className="text-blue-600 hover:underline">About</Link>
          </nav> */}
          <div className="sticky top-0 bg-white p-[30px_40px] flex items-center gap-5">

            <SidebarTrigger />

            <h1 className="text-[26px] font-medium">Title</h1>
          </div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/payments-and-fees" element={<Payments />} />
            <Route path="/staffs" element={<Staffs />} />
            <Route path="/class-rooms" element={<ClassRooms />} />

            {/* students */}
            <Route path="/students" element={<Students />} />
            <Route path="/students/add-students" element={<AddStudents />} />
            <Route path="/students/students-bulk-upload" element={<BulkUploadStudents />} />

            {/* teachers */}
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teachers/add-teachers" element={<AddTeachers />} />
            <Route path="/teachers/edit-teachers/:id" element={<EditTeacher />} />
            <Route path="/teachers/view-teachers/:id" element={<ViewTeacher />} />
          </Routes>
        </main>
        <Toaster />
      </SidebarProvider>
    </BrowserRouter>
  )
}

export default App