import { DataTable } from "@/components/data-table";
import { transactionColumns, transactionData } from "@/lib/data";

export function Transactions() {
  return (
    <div className="w-full bg-white p-[20px_30px] rounded-[20px]">
      <div className="mt-4">
        <h1 className="text-2xl font-bold">
          Transaction History
        </h1>
        <p className="mt-2">View and manage all payment transactions</p>
      </div>

      {/* create a data table for transactions */}
      <div className="pt-4">
        <DataTable
          columns={transactionColumns}
          data={transactionData}
          filterColumn="name"
          entityType="transaction"
          showActions={{
            add: false,
            view: true,
            edit: false,
            remove: false,
          }}
          onRemove={async (id) => {
            // TODO: Replace with your actual API call
            console.log("Removing transaction with ID:", id);
            // Example API call (uncomment when you're ready to implement):
            // await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
            // Refresh the data after removal
            // fetchTransactions();
          }}
        />
      </div>
    </div>
  );
}

export default Transactions;
