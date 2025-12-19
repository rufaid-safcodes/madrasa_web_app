import { DataTable } from "@/components/data-table";
import { dueFeesColumns, dueFeesData } from "@/lib/data";

export function DueFees() {
  return (
    <div className="w-full bg-white p-[20px_30px] rounded-[20px]">
      <div className="mt-4">
        <h1 className="text-2xl font-bold">
        Welcome to Madrasa Web App - Due Fees Management
        </h1>
        <p className="mt-2">Manage due fees here...</p>
      </div>

      {/* create a data table for due fees */}
      <div className="pt-4">
       <DataTable
          columns={dueFeesColumns}
          data={dueFeesData}
          filterColumn="classroom_id"
          entityType="dueFee"
          onRemove={async (id) => {
            // TODO: Replace with your actual API call
            console.log("Removing due fee with ID:", id);
            // Example API call (uncomment when you're ready to implement):
            // await fetch(`/api/dueFees/${id}`, { method: 'DELETE' });
            // Refresh the data after removal
            // fetchDueFees();
          }}
        />
      </div>
    </div>
  );
}

export default DueFees;
 