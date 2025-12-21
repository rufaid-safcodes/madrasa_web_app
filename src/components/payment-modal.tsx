"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  student: {
    id: string;
    first_name: string;
    last_name: string;
    fees_due?: string[]; // Make this optional
  };
  onPaymentSubmit: (months: string[], amount: number, paymentDate: string) => void;
};

export function PaymentModal({
  isOpen,
  onClose,
  student,
  onPaymentSubmit,
}: PaymentModalProps) {
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [paymentDate, setPaymentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const monthlyFee = 50; // Set your monthly fee here
  
  // Reset selected months and amount when student changes
  useEffect(() => {
    setSelectedMonths([]);
    setAmount(0);
    setIsDropdownOpen(false);
  }, [student?.id]);
  
  useEffect(() => {
    // Calculate total amount based on selected months
    setAmount(selectedMonths.length * monthlyFee);
  }, [selectedMonths]);
  
  const toggleMonth = (month: string) => {
    setSelectedMonths(prev => 
      prev.includes(month)
        ? prev.filter(m => m !== month)
        : [...prev, month]
    );
  };
  
  const selectAllMonths = () => {
    if (selectedMonths.length === student.fees_due?.length) {
      setSelectedMonths([]);
    } else {
      setSelectedMonths([...(student.fees_due || [])]);
    }
  };

  if (!isOpen || !student) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMonths.length === 0 || amount <= 0) return;
    
    // Submit all selected months at once
    onPaymentSubmit(selectedMonths, amount, paymentDate);
    onClose();
  };
  
  // If no fees are due, show completed state
  if (student.fees_due?.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-md shadow-xl border border-gray-100">
          <div className="p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">All Payments Completed</h3>
            <p className="text-sm text-gray-500 mb-6">No pending payments for this student.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl border border-gray-100">
        <div className="flex justify-between items-center border-b p-6 pb-4">
          <h2 className="text-lg font-semibold">Record Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 pt-4">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              {student.first_name} {student.last_name}
            </h3>
            <p className="text-sm text-gray-600">Student ID: {student.id}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Months (${monthlyFee} AED/month)
                </label>
                <div 
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 cursor-pointer flex justify-between items-center"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="truncate">
                    {selectedMonths.length === 0 
                      ? 'Select months...' 
                      : selectedMonths.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')}
                  </span>
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    <div 
                      className="px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={selectAllMonths}
                    >
                      <Check 
                        className={cn(
                          'h-4 w-4 mr-2',
                          selectedMonths.length === student.fees_due?.length ? 'opacity-100' : 'opacity-0'
                        )} 
                      />
                      Select All
                    </div>
                    {student.fees_due?.map((month) => (
                      <div
                        key={month}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMonth(month);
                        }}
                      >
                        <Check 
                          className={cn(
                            'h-4 w-4 mr-2',
                            selectedMonths.includes(month) ? 'opacity-100' : 'opacity-0'
                          )} 
                        />
                        {month.charAt(0).toUpperCase() + month.slice(1)}
                      </div>
                    ))}
                  </div>
                )}
                {selectedMonths.length > 0 && (
                  <p className="mt-1 text-xs text-gray-500">
                    {selectedMonths.length} month{selectedMonths.length > 1 ? 's' : ''} selected • {selectedMonths.length * monthlyFee} AED total
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (AED)
                </label>
                <input
                  type="number"
                  value={amount || ""}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  min={monthlyFee}
                  step="0.01"
                  required
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Date
                </label>
                <input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Record Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
