import { DataTable } from "@/components/data-table";
import { departmentsColumns, departmentsData } from "@/lib/data";

export function Departments() {
  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Welcome to Madrasa Web App - Departments Management
        </h1>
        <p className="mt-2">Manage departments and their departments here...</p>
      </div>

      {/* create a datatable for departments */}
      <div className="bg-white max-h-[calc(100vh-260px)] p-[20px_30px] rounded-2xl overflow-auto">
       <DataTable
          columns={departmentsColumns}
          data={departmentsData}
          filterColumn="name"
          entityType="department"
          onRemove={async (id) => {
            // TODO: Replace with your actual API call
            console.log("Removing department with ID:", id);
            // Example API call (uncomment when you're ready to implement):
            // await fetch(`/api/departments/${id}`, { method: 'DELETE' });
            // Refresh the data after removal
            // fetchdepartments();
          }}
        />
      </div>
    </div>
  );
}

export default Departments;
 