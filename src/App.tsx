import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/shared/app-sidebar"

import Dashboard from "@/features/dashboard/page"  
import Attendance from "@/features/attendance/page"
import Payments from "./features/payments/page"
import Staffs from "./features/staff/page"
import Students from "./features/students/page"
import Teachers from "./features/teachers/page"
import ClassRooms from "./features/classrooms/page"

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />

        <main className="w-full p-4">
          {/* <nav className="flex gap-4">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <Link to="/about" className="text-blue-600 hover:underline">About</Link>
          </nav> */}
          <SidebarTrigger />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/payments-and-fees" element={<Payments />} />
            <Route path="/staffs" element={<Staffs />} />
            <Route path="/class-rooms" element={<ClassRooms />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
          </Routes>
        </main>
      </SidebarProvider>
    </BrowserRouter>
  )
}

export default App