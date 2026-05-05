import React, { useState } from "react";
import { Section, Icon, TableToolbar, DataTable, IconButton, SlideOver, Button, Input } from "../components/ui";

const Customers: React.FC = () => {
  const [searchId, setSearchId] = useState("");
  const [startDate, setStartDate] = useState(new Date("2023-01-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleView = (customer: any) => {
    setSelectedCustomer(customer);
    setIsEditing(false);
    setIsSlideOverOpen(true);
  };

  const handleEdit = (customer: any) => {
    setSelectedCustomer(customer);
    setIsEditing(true);
    setIsSlideOverOpen(true);
  };

  const customers = [
    { id: "CUS-10293", name: "Alice Johnson", email: "alice.j@example.com", phone: "+1 (555) 123-4567", status: "Active", joinDate: "2023-01-15T10:30:00", spent: "$4,250.00", location: "New York, USA" },
    { id: "CUS-28374", name: "Bob Smith", email: "bob.smith@example.com", phone: "+1 (555) 987-6543", status: "Inactive", joinDate: "2023-03-22T14:15:00", spent: "$840.50", location: "Los Angeles, USA" },
    { id: "CUS-37465", name: "Charlie Brown", email: "charlie.b@example.com", phone: "+1 (555) 456-7890", status: "Active", joinDate: "2023-05-10T09:45:00", spent: "$12,100.00", location: "Chicago, USA" },
    { id: "CUS-46573", name: "Diana Prince", email: "diana.p@example.com", phone: "+1 (555) 234-5678", status: "Pending", joinDate: "2023-08-05T16:20:00", spent: "$0.00", location: "London, UK" },
    { id: "CUS-55412", name: "Ethan Hunt", email: "ethan.h@example.com", phone: "+1 (555) 876-5432", status: "Active", joinDate: "2023-09-12T11:05:00", spent: "$3,420.00", location: "Paris, France" },
  ];

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { bg: string; text: string; dot: string; }> = {
      Active: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
      Pending: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
      Inactive: { bg: "bg-rose-100", text: "text-rose-700", dot: "bg-rose-500" },
    };
    return configs[status] || { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-500" };
  };

  return (
    <main className="pb-8 px-8 min-h-screen animate-in fade-in duration-500">
      <Section title="Customer Management" accentColor="cyan">
        <TableToolbar
          searchLabel="Search"
          searchPlaceholder="Search customer name, email, ID..."
          searchValue={searchId}
          onSearchChange={setSearchId}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          onSearchSubmit={() => console.log("Searching for:", searchId)}
          onAddNew={() => console.log("Creating new customer")}
          addNewLabel="New Customer"
          className="mb-8"
        />

        <DataTable
          data={customers}
          onExport={() => console.log("Exporting...")}
          columns={[
            {
              header: "Customer ID",
              accessor: "id",
              className: "font-bold text-gray-900",
            },
            {
              header: "Customer Name",
              accessor: (row) => (
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-gray-900">{row.name}</span>
                  <div className="flex flex-col text-[11px] text-gray-500">
                    <span>{row.email}</span>
                    <span>{row.phone}</span>
                  </div>
                </div>
              ),
            },
            {
              header: "Join Date",
              accessor: (row) => {
                const date = new Date(row.joinDate);
                return (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-bold text-gray-900 leading-tight">
                      {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                );
              },
              className: "w-40",
            },
            {
              header: "Location",
              accessor: "location",
              className: "text-gray-600 font-medium",
            },
            {
              header: "Total Spent",
              accessor: "spent",
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
                    className="text-gray-400 hover:text-cyan-600 hover:bg-cyan-50"
                  />
                  <IconButton
                    icon={<Icon name="edit" size="sm" />}
                    onClick={() => handleEdit(row)}
                    className="text-gray-400 hover:text-cyan-600 hover:bg-cyan-50"
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
          showingLabel="customers"
        />
      </Section>

      <SlideOver
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title={isEditing ? "Edit Customer" : "Customer Details"}
      >
        {selectedCustomer && (
          <div className="flex flex-col h-full">
            <div className="bg-cyan-50 rounded-2xl p-5 border border-cyan-100 flex items-center justify-between mb-6 shrink-0">
              <div>
                <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-0.5">Total Spent</p>
                <p className="text-2xl font-black text-cyan-600 leading-none">{selectedCustomer.spent}</p>
              </div>
              {(() => {
                const config = getStatusConfig(selectedCustomer.status);
                return (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${config.bg} ${config.text} border border-white shadow-sm shrink-0`}>
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute w-1.5 h-1.5 rounded-full opacity-40 animate-ping ${config.dot}`} />
                      <span className={`relative w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider">{selectedCustomer.status}</span>
                  </div>
                );
              })()}
            </div>

            <div className="flex-1 overflow-hidden flex flex-col justify-between">
              <div className="grid grid-cols-1 gap-2 overflow-hidden">
                {isEditing ? (
                  <>
                    <Input label="Customer Name" defaultValue={selectedCustomer.name} />
                    <Input label="Customer ID" defaultValue={selectedCustomer.id} disabled />
                    <Input label="Email" defaultValue={selectedCustomer.email} />
                    <Input label="Phone" defaultValue={selectedCustomer.phone} />
                    <Input label="Location" defaultValue={selectedCustomer.location} />
                  </>
                ) : (
                  <div className="space-y-3">
                    <DetailItem label="Customer ID" value={selectedCustomer.id} />
                    <DetailItem label="Name" value={selectedCustomer.name} />
                    <DetailItem label="Email" value={selectedCustomer.email} />
                    <DetailItem label="Phone" value={selectedCustomer.phone} />
                    <DetailItem label="Join Date" value={new Date(selectedCustomer.joinDate).toLocaleString()} />
                    <DetailItem label="Location" value={selectedCustomer.location} />
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
                  <Button variant="secondary" onClick={() => handleEdit(selectedCustomer)} fullWidth icon={<Icon name="edit" size="sm" />}>
                    Edit Customer Profile
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

export default Customers;
