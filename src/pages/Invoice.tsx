import React, { useState } from "react";
import { Section, Icon, TableToolbar, DataTable, IconButton, SlideOver, Button, Input } from "../components/ui";

const Invoice: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(new Date("2023-10-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleView = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsEditing(false);
    setIsSlideOverOpen(true);
  };

  const handleEdit = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsEditing(true);
    setIsSlideOverOpen(true);
  };

  const invoices = [
    { id: "INV-2023-001", customer: "Alice Johnson", amount: "$1,250.00", date: "2023-10-24T10:30:00", dueDate: "2023-11-24T10:30:00", status: "Paid" },
    { id: "INV-2023-002", customer: "Bob Smith", amount: "$840.50", date: "2023-10-23T14:15:00", dueDate: "2023-11-23T14:15:00", status: "Unpaid" },
    { id: "INV-2023-003", customer: "Charlie Brown", amount: "$2,100.00", date: "2023-10-22T09:45:00", dueDate: "2023-10-15T09:45:00", status: "Overdue" },
    { id: "INV-2023-004", customer: "Diana Prince", amount: "$3,450.25", date: "2023-10-21T16:20:00", dueDate: "2023-11-21T16:20:00", status: "Paid" },
    { id: "INV-2023-005", customer: "Ethan Hunt", amount: "$420.00", date: "2023-10-20T11:05:00", dueDate: "2023-11-20T11:05:00", status: "Paid" },
  ];

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { bg: string; text: string; dot: string; }> = {
      "Paid": { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
      "Unpaid": { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
      "Overdue": { bg: "bg-rose-100", text: "text-rose-700", dot: "bg-rose-500" },
    };
    return configs[status] || { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-500" };
  };

  return (
    <main className="pb-8 px-8 min-h-screen animate-in fade-in duration-500">
      <Section title="Billing & Invoices" accentColor="orange">
        <TableToolbar
          searchLabel="Search"
          searchPlaceholder="Search invoices, customers, IDs..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          onSearchSubmit={() => console.log("Searching for:", searchQuery)}
          onAddNew={() => console.log("Creating new invoice")}
          addNewLabel="Create Invoice"
          className="mb-8"
        />

        <DataTable
          data={invoices}
          onExport={() => console.log("Exporting...")}
          showingLabel="invoices"
          columns={[
            {
              header: "Invoice ID",
              accessor: "id",
              className: "font-bold text-gray-900",
            },
            {
              header: "Date Issued",
              accessor: (row) => {
                const date = new Date(row.date);
                return (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-bold text-gray-900 leading-tight">
                      {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                );
              },
            },
            {
              header: "Due Date",
              accessor: (row) => {
                const date = new Date(row.dueDate);
                return (
                  <div className="flex flex-col gap-0.5">
                    <span className={`text-[12px] font-bold ${row.status === 'Overdue' ? 'text-rose-600' : 'text-gray-900'} leading-tight`}>
                      {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                );
              },
            },
            {
              header: "Customer",
              accessor: "customer",
              className: "font-bold text-gray-900",
            },
            {
              header: "Amount",
              accessor: "amount",
              className: "font-bold text-gray-900",
            },
            {
              header: "Status",
              accessor: (row) => {
                const config = getStatusConfig(row.status);
                return (
                  <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl ${config.bg} ${config.text} border border-white transition-all duration-300 cursor-default group`}>
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute w-2 h-2 rounded-full opacity-40 animate-ping ${config.dot}`} />
                      <span className={`relative w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    </div>
                    <span className="text-[11px] font-bold uppercase">{row.status}</span>
                  </div>
                );
              },
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
                    className="text-gray-400 hover:text-orange-600 hover:bg-orange-50"
                  />
                  <IconButton
                    icon={<Icon name="edit" size="sm" />}
                    onClick={() => handleEdit(row)}
                    className="text-gray-400 hover:text-orange-600 hover:bg-orange-50"
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
        title={isEditing ? "Edit Invoice" : "Invoice Details"}
      >
        {selectedInvoice && (
          <div className="flex flex-col h-full">
            <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100 flex items-center justify-between mb-6 shrink-0">
              <div>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-0.5">Total Amount</p>
                <p className="text-2xl font-black text-orange-700 leading-none">{selectedInvoice.amount}</p>
              </div>
              {(() => {
                const config = getStatusConfig(selectedInvoice.status);
                return (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${config.bg} ${config.text} border border-white shadow-sm shrink-0`}>
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute w-1.5 h-1.5 rounded-full opacity-40 animate-ping ${config.dot}`} />
                      <span className={`relative w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider">{selectedInvoice.status}</span>
                  </div>
                );
              })()}
            </div>

            <div className="flex-1 overflow-hidden flex flex-col justify-between">
              <div className="grid grid-cols-1 gap-2 overflow-hidden">
                {isEditing ? (
                  <>
                    <Input label="Customer Name" defaultValue={selectedInvoice.customer} />
                    <Input label="Invoice ID" defaultValue={selectedInvoice.id} disabled />
                    <Input label="Date Issued" defaultValue={new Date(selectedInvoice.date).toLocaleDateString()} />
                    <Input label="Due Date" defaultValue={new Date(selectedInvoice.dueDate).toLocaleDateString()} />
                    <Input label="Amount" defaultValue={selectedInvoice.amount} />
                  </>
                ) : (
                  <div className="space-y-3">
                    <DetailItem label="Invoice ID" value={selectedInvoice.id} />
                    <DetailItem label="Customer" value={selectedInvoice.customer} />
                    <DetailItem label="Date Issued" value={new Date(selectedInvoice.date).toLocaleDateString()} />
                    <DetailItem label="Due Date" value={<span className={selectedInvoice.status === 'Overdue' ? 'text-rose-600' : ''}>{new Date(selectedInvoice.dueDate).toLocaleDateString()}</span>} />
                    <DetailItem label="Amount Due" value={selectedInvoice.amount} />
                  </div>
                )}
              </div>

              <div className="pt-6 shrink-0">
                {isEditing ? (
                  <div className="flex gap-3">
                    <Button onClick={() => setIsSlideOverOpen(false)} fullWidth className="bg-orange-600 hover:bg-orange-700 border-orange-600 focus:ring-orange-500/20">Save Changes</Button>
                    <Button variant="secondary" onClick={() => setIsSlideOverOpen(false)} fullWidth>Cancel</Button>
                  </div>
                ) : (
                  <Button variant="secondary" onClick={() => handleEdit(selectedInvoice)} fullWidth icon={<Icon name="edit" size="sm" />} className="text-orange-600 hover:bg-orange-50 border-gray-200 hover:border-orange-200">
                    Edit Invoice
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </SlideOver>
    </main>
  );
};

const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="border-b border-gray-50 pb-2">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="text-sm font-bold text-gray-900">{value}</div>
  </div>
);

export default Invoice;
