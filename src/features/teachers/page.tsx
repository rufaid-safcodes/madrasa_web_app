import { DataTable } from "@/components/data-table";
import { columns, teachersData } from "@/lib/data";

export function Teachers() {
  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Welcome to Madrasa Web App - Teachers Management
        </h1>
        <p className="mt-2">Manage teachers and their departments here...</p>
      </div>

      {/* create a data table for teachers */}
      <div className="bg-white max-h-[calc(100vh-260px)] p-[20px_30px] rounded-2xl overflow-auto">
       <DataTable
          columns={columns}
          data={teachersData}
          filterColumn="name"
          entityType="teacher"
            filterContent={{
            available: true,
            data: "Teachers",
            title: "Filter Teachers by Availability",
            fieldsList: [
              { label: "Name", placeholder: "Enter name", type: "input" },
              { label: "Department", placeholder: "Select department", type: "select", apiEndpoint: "/api/departments" },
              { label: "Status", placeholder: "Enter status", type: "input" },
              // { label: "Siblings Id", placeholder: "Enter siblings ID", type: "input" },
            ],
            apiEndpoint: "/api/students/filter"
          }}
          onRemove={async (id) => {
            // TODO: Replace with your actual API call
            console.log("Removing teacher with ID:", id);
            // Example API call (uncomment when you're ready to implement):
            // await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
            // Refresh the data after removal
            // fetchTeachers();
          }}
        />
      </div>
    </div>
  );
}

export default Teachers;
 