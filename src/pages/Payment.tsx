import React, { useState } from "react";
import { Section, Icon, TableToolbar, Badge, DataTable, IconButton, SlideOver, Button, Input } from "../components/ui";

const Payment: React.FC = () => {
  const [searchId, setSearchId] = useState("");
  const [startDate, setStartDate] = useState(new Date("2023-10-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleView = (payment: any) => {
    setSelectedPayment(payment);
    setIsEditing(false);
    setIsSlideOverOpen(true);
  };

  const handleEdit = (payment: any) => {
    setSelectedPayment(payment);
    setIsEditing(true);
    setIsSlideOverOpen(true);
  };

  const transactions = [
    { id: "TXN-63215615263", customer: "Alice Johnson", amount: "$1,250.00", status: "Completed", date: "Oct 24, 2023", method: "Visa •••• 4242" },
    { id: "TXN-85421563210", customer: "Bob Smith", amount: "$840.50", status: "Pending", date: "Oct 24, 2023", method: "Mastercard •••• 5555" },
    { id: "TXN-95123478901", customer: "Charlie Brown", amount: "$2,100.00", status: "Failed", date: "Oct 23, 2023", method: "PayPal" },
    { id: "TXN-10234567894", customer: "Diana Prince", amount: "$3,450.25", status: "Completed", date: "Oct 22, 2023", method: "Bank Transfer" },
    { id: "TXN-55412369874", customer: "Ethan Hunt", amount: "$420.00", status: "Completed", date: "Oct 21, 2023", method: "Apple Pay" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "success";
      case "Pending": return "warning";
      case "Failed": return "danger";
      default: return "default";
    }
  };

  return (
    <main className="pb-8 px-8 min-h-screen animate-in fade-in duration-500">
      <Section title="Transaction Management" accentColor="purple">
        <TableToolbar
          searchLabel="Search"
          searchPlaceholder="Search customer, ID, status..."
          searchValue={searchId}
          onSearchChange={setSearchId}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          onSearchSubmit={() => console.log("Searching for:", searchId)}
          onAddNew={() => console.log("Creating new transaction")}
          addNewLabel="New Payment"
          className="mb-8"
        />

        <DataTable
          data={transactions}
          onExport={() => console.log("Exporting...")}
          columns={[
            {
              header: "Sl",
              accessor: (_, index) => (currentPage - 1) * itemsPerPage + index + 1,
              className: "text-gray-400 w-12",
            },
            {
              header: "Invoice ID",
              accessor: "id",
              className: "font-bold text-gray-900",
            },
            {
              header: "Date",
              accessor: "date",
              className: "text-gray-600",
            },
            {
              header: "Customer",
              accessor: "customer",
              className: "font-bold text-gray-900",
            },
            {
              header: "Payment Method",
              accessor: "method",
              className: "text-gray-600",
            },
            {
              header: "Amount",
              accessor: "amount",
              className: "font-bold text-gray-900",
            },
            {
              header: "Status",
              accessor: (row) => (
                <Badge
                  variant={getStatusColor(row.status) as any}
                  className="px-4 py-1.5 rounded-lg bg-emerald-500 text-white border-none font-bold text-[12px]"
                >
                  Approved
                </Badge>
              ),
            },
            {
              header: "Action",
              headerClassName: "text-right",
              className: "text-right",
              accessor: (row) => (
                <div className="flex items-center justify-end gap-2">
                  <IconButton
                    icon={<Icon name="visibility" size="sm" />}
                    onClick={() => handleView(row)}
                    className="text-gray-400 hover:text-purple-600 hover:bg-purple-50"
                  />
                  <IconButton
                    icon={<Icon name="edit" size="sm" />}
                    onClick={() => handleEdit(row)}
                    className="text-gray-400 hover:text-purple-600 hover:bg-purple-50"
                  />
                </div>
              ),
            },
          ]}
          currentPage={currentPage}
          totalPages={3}
          onPageChange={setCurrentPage}
          totalItems={24}
          itemsPerPage={itemsPerPage}
        />
      </Section>

      <SlideOver
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title={isEditing ? "Edit Payment" : "Payment Details"}
      >
        {selectedPayment && (
          <div className="space-y-8">
            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Total Amount</p>
                <p className="text-3xl font-black text-purple-600">{selectedPayment.amount}</p>
              </div>
              <Badge variant={getStatusColor(selectedPayment.status) as any} className="px-5 py-2 rounded-xl border-none shadow-lg shadow-emerald-100">
                {selectedPayment.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {isEditing ? (
                <>
                  <Input label="Customer Name" defaultValue={selectedPayment.customer} />
                  <Input label="Invoice ID" defaultValue={selectedPayment.id} disabled />
                  <Input label="Amount" defaultValue={selectedPayment.amount} />
                  <Input label="Payment Method" defaultValue={selectedPayment.method} />
                  <div className="pt-4 flex gap-3">
                    <Button onClick={() => setIsSlideOverOpen(false)} fullWidth>Save Changes</Button>
                    <Button variant="secondary" onClick={() => setIsSlideOverOpen(false)} fullWidth>Cancel</Button>
                  </div>
                </>
              ) : (
                <>
                  <DetailItem label="Invoice ID" value={selectedPayment.id} />
                  <DetailItem label="Customer" value={selectedPayment.customer} />
                  <DetailItem label="Date" value={selectedPayment.date} />
                  <DetailItem label="Method" value={selectedPayment.method} />
                  <DetailItem label="Transaction ID" value="TRX-998877665544" />
                  <div className="pt-8">
                    <Button variant="secondary" onClick={() => handleEdit(selectedPayment)} fullWidth icon={<Icon name="edit" size="sm" />}>
                      Edit Transaction
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </SlideOver>
    </main>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="border-b border-gray-50 pb-4">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</p>
    <p className="text-sm font-bold text-gray-900">{value}</p>
  </div>
);

export default Payment;
