import { DataTable } from "@/components/data-table";
import { columns, teachersData } from "@/lib/data";

export function Teachers() {
  return (
    <div className="w-full bg-white p-[20px_30px] rounded-[20px]">
      <div className="mt-4">
        <h1 className="text-2xl font-bold">
          Welcome to Madrasa Web App - Teachers Management
        </h1>
        <p className="mt-2">Manage teachers and their departments here...</p>
      </div>

      {/* create a datatable for teachers */}
      <div className="pt-4">
        <DataTable
          columns={columns}
          data={teachersData}
          filterColumn="email"
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
