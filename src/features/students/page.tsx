import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { PaymentModal } from "@/components/payment-modal";
import { studentsData, studentColumns } from "@/lib/data";
import type { Student } from "@/lib/data";

export function Students() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handlePaymentSubmit = (months: string[], amount: number, paymentDate: string) => {
    if (!selectedStudent) return;

    console.log("Payment details:", {
      studentId: selectedStudent.id,
      studentName: `${selectedStudent.first_name} ${selectedStudent.last_name}`,
      months,
      totalAmount: amount,
      paymentDate,
    });

    // In a real app, you would make an API call here to record the payment
    // await recordPayments(selectedStudent.id, { months, amount, paymentDate });

    // Update the local state to reflect the payments
    // This is just a temporary solution - in a real app, you would refetch the data
    const updatedFeesDue = selectedStudent.fees_due?.filter(m => !months.includes(m)) || [];
    console.log(`Updated fees due for student ${selectedStudent.id}:`, updatedFeesDue);

    // Show single success message for all months
    const monthList = months.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ');
    alert(`Successfully recorded payment of ${amount} AED for ${monthList}`);
  };
  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Welcome to Madrasa Web App - Students Management
        </h1>
        <p className="mt-2">Manage students and their classes here...</p>
      </div>

      {/* create a datatable for teachers */}
      <div className="bg-white max-h-[calc(100vh-260px)] p-[20px_30px] rounded-2xl overflow-auto">
        <DataTable
          columns={studentColumns}
          data={studentsData}
          filterColumn="phone"
          entityType="student"
          showActions={{
            add: true,
            view: true,
            edit: true,
            remove: true,
            makePayment: true
          }}
          filterContent={{
            available: true,
            data: "Students",
            title: "Filter Students by Availability",
            fieldsList: [
              { label: "Name", placeholder: "Enter name", type: "input" },
              { label: "Class", placeholder: "Select class", type: "select", apiEndpoint: "/api/classes" },
              { label: "Admission Number", placeholder: "Enter admission number", type: "input" },
              { label: "Siblings Id", placeholder: "Enter siblings ID", type: "input" },
            ],
            apiEndpoint: "/api/students/filter"
          }}
          onRemove={async (id) => {
            // TODO: Replace with your actual API call
            console.log("Removing student with ID:", id);
            // Example API call (uncomment when you're ready to implement):
            // await fetch(`/api/students/${id}`, { method: 'DELETE' });
            // Refresh the data after removal
            // fetchTeachers();
          }}
          onMakePayment={(id) => {
            const student = studentsData.find(s => s.id === id) || null;
            if (student) {
              setSelectedStudent(student);
              setIsPaymentModalOpen(true);
            }
          }}
        />
      </div>

      {
        selectedStudent && (
          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            student={selectedStudent}
            onPaymentSubmit={handlePaymentSubmit}
          />
        )
      }
    </div >
  );
}

export default Students;
