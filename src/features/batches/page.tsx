import { DataTable } from "@/components/data-table";
import { batchColumns, batchData } from "@/lib/data";

export function Batches() {
  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Welcome to Madrasa Web App - Batch Management
        </h1>
        <p className="mt-2">Manage batches here...</p>
      </div>

      {/* create a data table for batches */}
      <div className="bg-white max-h-[calc(100vh-260px)] p-[20px_30px] rounded-2xl overflow-auto">
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
