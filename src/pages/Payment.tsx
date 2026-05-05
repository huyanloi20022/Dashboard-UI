import React, { useState } from "react";
import { Section, Icon, TableToolbar, DataTable, IconButton, SlideOver, Button, Input } from "../components/ui";

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
    { id: "TXN-63215615263", customer: "Alice Johnson", amount: "$1,250.00", status: "Completed", date: "2023-10-24T10:30:00", method: "Visa •••• 4242" },
    { id: "TXN-85421563210", customer: "Bob Smith", amount: "$840.50", status: "Pending", date: "2023-10-24T14:15:00", method: "Mastercard •••• 5555" },
    { id: "TXN-95123478901", customer: "Charlie Brown", amount: "$2,100.00", status: "Failed", date: "2023-10-23T09:45:00", method: "PayPal" },
    { id: "TXN-10234567894", customer: "Diana Prince", amount: "$3,450.25", status: "Completed", date: "2023-10-22T16:20:00", method: "Bank Transfer" },
    { id: "TXN-55412369874", customer: "Ethan Hunt", amount: "$420.00", status: "Completed", date: "2023-10-21T11:05:00", method: "Apple Pay" },
  ];

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { bg: string; text: string; dot: string; }> = {
      Completed: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
      Pending: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
      Failed: { bg: "bg-rose-100", text: "text-rose-700", dot: "bg-rose-500" },
    };
    return configs[status] || { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-500" };
  };

  const getPaymentMethodIcon = (method: string) => {
    if (method.includes("Visa")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6mJGhxQhJambr1oJ5wl-hEfiY38W9tGCfjA&s";
    if (method.includes("Mastercard")) return "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg";
    if (method.includes("PayPal")) return "https://icon-icons.com/download-file?file=https%3A%2F%2Fimages.icon-icons.com%2F674%2FPNG%2F512%2FPaypal_Logo_icon-icons.com_60551.png&id=60551&pack_or_individual=pack";
    if (method.includes("Apple Pay")) return "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg";
    if (method.includes("Bank Transfer")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbpqMWa2mghksFdMK2-bEb-uzGkbUHEvmGRA&s";
    return null;
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
              header: "Invoice ID",
              accessor: "id",
              className: "font-bold text-gray-900",
            },
            {
              header: "Date",
              accessor: (row) => {
                const date = new Date(row.date);
                return (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-bold text-gray-900 leading-tight">
                      {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                      at {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              },
              className: "w-40",
            },
            {
              header: "Customer",
              accessor: "customer",
              className: "font-bold text-gray-900",
            },
            {
              header: "Payment Method",
              accessor: (row) => {
                const icon = getPaymentMethodIcon(row.method);
                return (
                  <div className="flex items-center gap-3">
                    <div className="w-8 flex justify-center shrink-0">
                      {icon && <img src={icon} alt={row.method} className="h-4 w-full object-contain opacity-90" />}
                    </div>
                    <span className="text-[12px] font-medium text-gray-600">{row.method}</span>
                  </div>
                );
              },
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
          <div className="flex flex-col h-full">
            <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100 flex items-center justify-between mb-6 shrink-0">
              <div>
                <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-0.5">Total Amount</p>
                <p className="text-2xl font-black text-purple-600 leading-none">{selectedPayment.amount}</p>
              </div>
              {(() => {
                const config = getStatusConfig(selectedPayment.status);
                return (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${config.bg} ${config.text} border border-white shadow-sm shrink-0`}>
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute w-1.5 h-1.5 rounded-full opacity-40 animate-ping ${config.dot}`} />
                      <span className={`relative w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider">{selectedPayment.status}</span>
                  </div>
                );
              })()}
            </div>

            <div className="flex-1 overflow-hidden flex flex-col justify-between">
              <div className="grid grid-cols-1 gap-2 overflow-hidden">
                {isEditing ? (
                  <>
                    <Input label="Customer Name" defaultValue={selectedPayment.customer} />
                    <Input label="Invoice ID" defaultValue={selectedPayment.id} disabled />
                    <Input label="Amount" defaultValue={selectedPayment.amount} />
                    <Input label="Payment Method" defaultValue={selectedPayment.method} />
                  </>
                ) : (
                  <div className="space-y-3">
                    <DetailItem label="Invoice ID" value={selectedPayment.id} />
                    <DetailItem label="Customer" value={selectedPayment.customer} />
                    <DetailItem label="Date" value={selectedPayment.date} />
                    <DetailItem
                      label="Method"
                      value={
                        <div className="flex items-center gap-3">
                          <div className="w-8 flex justify-center shrink-0">
                            {getPaymentMethodIcon(selectedPayment.method) && (
                              <img src={getPaymentMethodIcon(selectedPayment.method)!} alt="" className="h-4 w-full object-contain" />
                            )}
                          </div>
                          <span>{selectedPayment.method}</span>
                        </div>
                      }
                    />
                    <DetailItem label="Transaction ID" value="TRX-998877665544" />
                  </div>
                )}
              </div>

              <div className="pt-6 shrink-0">
                {isEditing ? (
                  <div className="flex gap-3">
                    <Button onClick={() => setIsSlideOverOpen(false)} fullWidth>Save Changes</Button>
                    <Button variant="secondary" onClick={() => setIsSlideOverOpen(false)} fullWidth>Cancel</Button>
                  </div>
                ) : (
                  <Button variant="secondary" onClick={() => handleEdit(selectedPayment)} fullWidth icon={<Icon name="edit" size="sm" />}>
                    Edit Transaction
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

export default Payment;
