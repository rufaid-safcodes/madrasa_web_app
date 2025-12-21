import { DataTable } from "@/components/data-table";
import { classroomColumns, classroomData } from "@/lib/data";

export function ClassRooms() {
  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Welcome to Madrasa Web App - Class Rooms Management
        </h1>
        <p className="mt-2">Manage class rooms here...</p>
      </div>

      {/* create a data table for classrooms */}
      <div className="bg-white max-h-[calc(100vh-260px)] p-[20px_30px] rounded-2xl overflow-auto">
        <DataTable
          columns={classroomColumns}
          data={classroomData}
          filterColumn="name"
          entityType="classroom"
          onRemove={async (id) => {
            // TODO: Replace with your actual API call
            console.log("Removing classroom with ID:", id);
            // Example API call (uncomment when you're ready to implement):
            // await fetch(`/api/classrooms/${id}`, { method: 'DELETE' });
            // Refresh the data after removal
            // fetchTeachers();
          }}
        />
      </div>
    </div>
  );
}

export default ClassRooms;
