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
import EditStudent from "./features/students/edit/page"
import ViewStudent from "./features/students/view/page"
import AddStaff from "./features/staff/add/page"
import EditStaff from "./features/staff/edit/page"
import ViewStaff from "./features/staff/view/page"
import AddClassRoom from "./features/classrooms/add/page"
import EditClassRoom from "./features/classrooms/edit/page"
import ViewClassRoom from "./features/classrooms/view/page"
import Subjects from "./features/subjects/page"
import AddSubjects from "./features/subjects/add/page"
import EditSubject from "./features/subjects/edit/page"
import ViewSubject from "./features/subjects/view/page"
import Batches from "./features/batches/page"
// import Batches from "./features/batches/page"

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
          <div className="p-10!">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/payments-and-fees" element={<Payments />} />

              {/* students */}
              <Route path="/students" element={<Students />} />
              <Route path="/students/add-students" element={<AddStudents />} />
              <Route path="/students/edit-students/:id" element={<EditStudent />} />
              <Route path="/students/view-students/:id" element={<ViewStudent />} />
              <Route path="/students/students-bulk-upload" element={<BulkUploadStudents />} />

              {/* subjects */}
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/subjects/add-subjects" element={<AddSubjects />} />
              <Route path="/subjects/edit-subjects/:id" element={<EditSubject />} />
              <Route path="/subjects/view-subjects/:id" element={<ViewSubject />} />

              {/* batches */}
              <Route path="/batches" element={<Batches />} />
              {/* <Route path="/batches/add-batches" element={<AddBatches />} /> */}
              {/* <Route path="/batches/edit-batches/:id" element={<EditBatches />} /> */}
              {/* <Route path="/batches/view-batches/:id" element={<ViewBatches />} /> */}

              {/* classrooms */}
              <Route path="/classrooms" element={<ClassRooms />} />
              <Route path="/classrooms/add-classroom" element={<AddClassRoom />} />
              <Route path="/classrooms/edit-classroom/:id" element={<EditClassRoom />} />
              <Route path="/classrooms/view-classroom/:id" element={<ViewClassRoom />} />

              {/* teachers */}
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/teachers/add-teachers" element={<AddTeachers />} />
              <Route path="/teachers/edit-teachers/:id" element={<EditTeacher />} />
              <Route path="/teachers/view-teachers/:id" element={<ViewTeacher />} />

              {/* staffs */}
              <Route path="/staffs/accounts" element={<Staffs />} />
              <Route path="/staffs/accounts/add-staff" element={<AddStaff />} />
              <Route path="/staffs/edit-staffs/:id" element={<EditStaff />} />
              <Route path="/staffs/view-staffs/:id" element={<ViewStaff />} />

            </Routes>
          </div>
        </main>
        <Toaster />
      </SidebarProvider>
    </BrowserRouter>
  )
}

export default App