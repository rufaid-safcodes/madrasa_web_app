import { DataTable } from "@/components/data-table";
import { feeSettingsColumns, feeSettingsData } from "@/lib/data";

export function FeeSettings() {
  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Welcome to Madrasa Web App - Fee Settings Management
        </h1>
        <p className="mt-2">Manage fee settings here...</p>
      </div>

      {/* create a data table for fee settings */}
      <div className="bg-white max-h-[calc(100vh-260px)] p-[20px_30px] rounded-2xl overflow-auto">
       <DataTable
          columns={feeSettingsColumns}
          data={feeSettingsData}
          filterColumn="classroom_id"
          entityType="feeSetting"
          onRemove={async (id) => {
            // TODO: Replace with your actual API call
            console.log("Removing fee setting with ID:", id);
            // Example API call (uncomment when you're ready to implement):
            // await fetch(`/api/feeSettings/${id}`, { method: 'DELETE' });
            // Refresh the data after removal
            // fetchFeeSettings();
          }}
        />
      </div>
    </div>
  );
}

export default FeeSettings;
 