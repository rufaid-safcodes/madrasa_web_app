import { DataTable } from "@/components/data-table";
import { subjectColumns, subjectsData } from "@/lib/data";

export function Subjects() {
  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Welcome to Madrasa Web App - Subjects Management
        </h1>
        <p className="mt-2">Manage subjects and their classes here...</p>
      </div>

      {/* create a datatable for teachers */}
      <div className="bg-white max-h-[calc(100vh-260px)] p-[20px_30px] rounded-2xl overflow-auto">
        <DataTable
          columns={subjectColumns}
          data={subjectsData}
          filterColumn="subject_name"
          entityType="subject"
          onRemove={async (id) => {
            // TODO: Replace with your actual API call
            console.log("Removing subject with ID:", id);
            // Example API call (uncomment when you're ready to implement):
            // await fetch(`/api/subjects/${id}`, { method: 'DELETE' });
            // Refresh the data after removal
            // fetchTeachers();
          }}
        />
      </div>
    </div>
  );
}

export default Subjects;
