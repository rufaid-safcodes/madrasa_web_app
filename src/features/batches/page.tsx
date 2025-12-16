import { DataTable } from "@/components/data-table";
import { batchColumns, batchData } from "@/lib/data";

export function Batches() {
  return (
    <div className="w-full bg-white p-[20px_30px] rounded-[20px]">
      <div className="mt-4">
        <h1 className="text-2xl font-bold">
          Welcome to Madrasa Web App - Class Rooms Management
        </h1>
        <p className="mt-2">Manage class rooms here...</p>
      </div>

      {/* create a datatable for teachers */}
      <div className="pt-4">
        <DataTable
          columns={batchColumns}
          data={batchData}
          filterColumn="name"
          entityType="batch"
          onRemove={async (id) => {
            // TODO: Replace with your actual API call
            console.log("Removing classroom with ID:", id);
            // Example API call (uncomment when you're ready to implement):
            // await fetch(`/api/batches/${id}`, { method: 'DELETE' });
            // Refresh the data after removal
            // fetchTeachers();
          }}
        />
      </div>
    </div>
  );
}

export default Batches;
