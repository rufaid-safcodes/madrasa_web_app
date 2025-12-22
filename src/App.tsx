import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/shared/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import Dashboard from "@/features/dashboard/page"
import Attendance from "@/features/attendance/page"
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
import AddBatch from "./features/batches/add/page"
import EditBatch from "./features/batches/edit/page"
import ViewBatch from "./features/batches/view/page"
import Departments from "./features/departments/page"
import AddDepartment from "./features/departments/add/page"
import EditDepartment from "./features/departments/edit/page"
import ViewDepartment from "./features/departments/view/page"
import FeeSettings from "./features/feeSettings/page"
import AddFeeSetting from "./features/feeSettings/add/page"
import EditFeeSetting from "./features/feeSettings/edit/page"
import ViewFeeSetting from "./features/feeSettings/view/page"
import DueFees from "./features/dueFees/page"
import Transactions from "./features/transactions/page"
import ViewTransaction from "./features/transactions/view/page"
import ViewDueFees from "./features/dueFees/view/page"

// Helper function to get page title based on route
const getTitleFromRoute = (pathname: string): string => {
  const titleMap: Record<string, string> = {
    "/": "Dashboard",
    "/attendance": "Attendance",
    "/students": "Students",
    "/students/add-students": "Add Student",
    "/students/edit-students": "Edit Student",
    "/students/view-students": "View Student",
    "/students/students-bulk-upload": "Bulk Upload Students",
    "/subjects": "Subjects",
    "/subjects/add-subjects": "Add Subject",
    "/subjects/edit-subjects": "Edit Subject",
    "/subjects/view-subjects": "View Subject",
    "/batches": "Batches",
    "/batchs/add-batchs": "Add Batch",
    "/batchs/edit-batchs": "Edit Batch",
    "/batchs/view-batchs": "View Batch",
    "/classrooms": "Classrooms",
    "/classrooms/add-classroom": "Add Classroom",
    "/classrooms/edit-classroom": "Edit Classroom",
    "/classrooms/view-classroom": "View Classroom",
    "/teachers": "Teachers",
    "/teachers/add-teachers": "Add Teacher",
    "/teachers/edit-teachers": "Edit Teacher",
    "/teachers/view-teachers": "View Teacher",
    "/departments": "Departments",
    "/departments/add-departments": "Add Department",
    "/departments/edit-departments": "Edit Department",
    "/departments/view-departments": "View Department",
    "/staffs/accounts": "Accounts Staff",
    "/staffs/add-staffs": "Add Staff",
    "/staffs/edit-staffs": "Edit Staff",
    "/staffs/view-staffs": "View Staff",
    "/transactions": "Transactions",
    "/transactions/view-transactions": "View Transaction",
    "/due-fees": "Due Fees",
    "/dueFees/view-dueFees": "View Due Fees",
    "/fee-settings": "Fee Settings",
    "/feeSettings/add-feeSettings": "Add Fee Setting",
    "/feeSettings/edit-feeSettings": "Edit Fee Setting",
    "/feeSettings/view-feeSettings": "View Fee Setting",
  };

  // Check for exact match first
  if (titleMap[pathname]) {
    return titleMap[pathname];
  }

  // Check for partial matches (for dynamic routes with IDs)
  const pathWithoutId = pathname.replace(/\/[a-zA-Z0-9-]+$/, "");
  if (titleMap[pathWithoutId]) {
    return titleMap[pathWithoutId];
  }

  return "Dashboard";
};

function AppContent() {
  const location = useLocation();
  const title = getTitleFromRoute(location.pathname);
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full bg-[#f1f1f1] h-screen flex flex-col" style={{overflow:"hidden"}}>
        {/* <nav className="flex gap-4">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <Link to="/about" className="text-blue-600 hover:underline">About</Link>
        </nav> */}
        <div className="sticky top-0 bg-white p-[30px_40px] flex items-center gap-5 shadow-xl z-50">

          <SidebarTrigger />

          <h1 className="text-[26px] font-medium">{title}</h1>
        </div>
          <div className="p-10!">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/attendance" element={<Attendance />} />

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
              <Route path="/batchs/add-batchs" element={<AddBatch />} />
              <Route path="/batchs/edit-batchs/:id" element={<EditBatch />} />
              <Route path="/batchs/view-batchs/:id" element={<ViewBatch />} />

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

              {/* departments */}
              <Route path="/departments" element={<Departments />} />
              <Route path="/departments/add-departments" element={<AddDepartment />} />
              <Route path="/departments/edit-departments/:id" element={<EditDepartment />} />
              <Route path="/departments/view-departments/:id" element={<ViewDepartment />} />

              {/* staffs */}
              <Route path="/staffs/accounts" element={<Staffs />} />
              <Route path="/staffs/add-staffs" element={<AddStaff />} />
              <Route path="/staffs/edit-staffs/:id" element={<EditStaff />} />
              <Route path="/staffs/view-staffs/:id" element={<ViewStaff />} />

              {/* Accounts and fees */}
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transactions/view-transactions/:id" element={<ViewTransaction />} />
              
              <Route path="/due-fees" element={<DueFees />} />
              <Route path="/dueFees/view-dueFees/:id" element={<ViewDueFees />} />
              
              <Route path="/fee-settings" element={<FeeSettings />} />
              <Route path="/feeSettings/add-feeSettings" element={<AddFeeSetting />} />
              <Route path="/feeSettings/edit-feeSettings/:id" element={<EditFeeSetting />} />
              <Route path="/feeSettings/view-feeSettings/:id" element={<ViewFeeSetting />} />
              
            </Routes>
          </div>
        </main>
        <Toaster />
      </SidebarProvider>
    );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App