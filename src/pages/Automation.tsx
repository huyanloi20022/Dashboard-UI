import React, { useState } from "react";
import { Section, Icon, TableToolbar, DataTable, IconButton, SlideOver, Button, Input } from "../components/ui";

const Automation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(new Date("2023-10-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleView = (workflow: any) => {
    setSelectedWorkflow(workflow);
    setIsEditing(false);
    setIsSlideOverOpen(true);
  };

  const handleEdit = (workflow: any) => {
    setSelectedWorkflow(workflow);
    setIsEditing(true);
    setIsSlideOverOpen(true);
  };

  const automations = [
    { id: "WF-001", name: "Welcome Email Sequence", trigger: "New Customer Signup", actions: "Send 3 emails", status: "Active", lastRun: "2023-10-24T10:30:00" },
    { id: "WF-002", name: "Abandoned Cart Recovery", trigger: "Cart idle for 2 hours", actions: "Send reminder email", status: "Active", lastRun: "2023-10-24T14:15:00" },
    { id: "WF-003", name: "Low Stock Alert", trigger: "Stock < 10 units", actions: "Notify Inventory Team", status: "Paused", lastRun: "2023-10-22T09:45:00" },
    { id: "WF-004", name: "High Value Order Alert", trigger: "Order > $1000", actions: "Flag for manual review", status: "Active", lastRun: "2023-10-21T16:20:00" },
    { id: "WF-005", name: "Monthly Report Generation", trigger: "1st of every month", actions: "Generate PDF, Email to Admin", status: "Draft", lastRun: "2023-10-01T00:00:00" },
  ];

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { bg: string; text: string; dot: string; }> = {
      "Active": { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
      "Paused": { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
      "Draft": { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" },
    };
    return configs[status] || { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-500" };
  };

  return (
    <main className="pb-8 px-8 min-h-screen animate-in fade-in duration-500">
      <Section title="Workflow Automation" accentColor="violet">
        <TableToolbar
          searchLabel="Search"
          searchPlaceholder="Search workflows, triggers, IDs..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          onSearchSubmit={() => console.log("Searching for:", searchQuery)}
          onAddNew={() => console.log("Creating new workflow")}
          addNewLabel="Create Workflow"
          className="mb-8"
        />

        <DataTable
          data={automations}
          onExport={() => console.log("Exporting...")}
          showingLabel="workflows"
          columns={[
            {
              header: "Workflow ID",
              accessor: "id",
              className: "font-bold text-gray-900",
            },
            {
              header: "Workflow Name",
              accessor: "name",
              className: "font-bold text-gray-900",
            },
            {
              header: "Trigger",
              accessor: "trigger",
              className: "text-gray-600 font-medium",
            },
            {
              header: "Actions",
              accessor: "actions",
              className: "text-gray-600 font-medium",
            },
            {
              header: "Last Run",
              accessor: (row) => {
                const date = new Date(row.lastRun);
                return (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-bold text-gray-900 leading-tight">
                      {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                      at {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              },
            },
            {
              header: "Status",
              accessor: (row) => {
                const config = getStatusConfig(row.status);
                return (
                  <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl ${config.bg} ${config.text} border border-white transition-all duration-300 cursor-default group`}>
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute w-2 h-2 rounded-full opacity-40 ${row.status === 'Active' ? 'animate-ping' : ''} ${config.dot}`} />
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
                    className="text-gray-400 hover:text-violet-600 hover:bg-violet-50"
                  />
                  <IconButton
                    icon={<Icon name="edit" size="sm" />}
                    onClick={() => handleEdit(row)}
                    className="text-gray-400 hover:text-violet-600 hover:bg-violet-50"
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
        title={isEditing ? "Edit Workflow" : "Workflow Details"}
      >
        {selectedWorkflow && (
          <div className="flex flex-col h-full">
            <div className="bg-violet-50 rounded-2xl p-5 border border-violet-100 flex items-center justify-between mb-6 shrink-0">
              <div>
                <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-0.5">Workflow Name</p>
                <p className="text-xl font-black text-violet-600 leading-none">{selectedWorkflow.name}</p>
              </div>
              {(() => {
                const config = getStatusConfig(selectedWorkflow.status);
                return (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${config.bg} ${config.text} border border-white shadow-sm shrink-0`}>
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute w-1.5 h-1.5 rounded-full opacity-40 ${selectedWorkflow.status === 'Active' ? 'animate-ping' : ''} ${config.dot}`} />
                      <span className={`relative w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider">{selectedWorkflow.status}</span>
                  </div>
                );
              })()}
            </div>

            <div className="flex-1 overflow-hidden flex flex-col justify-between">
              <div className="grid grid-cols-1 gap-2 overflow-hidden">
                {isEditing ? (
                  <>
                    <Input label="Workflow Name" defaultValue={selectedWorkflow.name} />
                    <Input label="Workflow ID" defaultValue={selectedWorkflow.id} disabled />
                    <Input label="Trigger" defaultValue={selectedWorkflow.trigger} />
                    <Input label="Actions" defaultValue={selectedWorkflow.actions} />
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-gray-700">Status</label>
                      <select className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all appearance-none bg-white">
                        <option value="Active">Active</option>
                        <option value="Paused">Paused</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <DetailItem label="Workflow ID" value={selectedWorkflow.id} />
                    <DetailItem label="Name" value={selectedWorkflow.name} />
                    <DetailItem label="Trigger Event" value={selectedWorkflow.trigger} />
                    <DetailItem label="Executed Actions" value={selectedWorkflow.actions} />
                    <DetailItem label="Last Run Date" value={new Date(selectedWorkflow.lastRun).toLocaleString()} />
                    
                    <div className="pt-4 border-t border-gray-50">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Execution History</p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Today, 10:30 AM</span>
                          <span className="font-bold text-emerald-600">Success</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Yesterday, 2:15 PM</span>
                          <span className="font-bold text-emerald-600">Success</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Oct 22, 9:45 AM</span>
                          <span className="font-bold text-emerald-600">Success</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 shrink-0">
                {isEditing ? (
                  <div className="flex gap-3">
                    <Button onClick={() => setIsSlideOverOpen(false)} fullWidth className="bg-violet-600 hover:bg-violet-700 border-violet-600 focus:ring-violet-500/20">Save Configuration</Button>
                    <Button variant="secondary" onClick={() => setIsSlideOverOpen(false)} fullWidth>Cancel</Button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Button variant="secondary" onClick={() => handleEdit(selectedWorkflow)} fullWidth icon={<Icon name="edit" size="sm" />} className="text-violet-600 hover:bg-violet-50 border-gray-200 hover:border-violet-200">
                      Edit Workflow
                    </Button>
                    <Button variant="secondary" onClick={() => setIsSlideOverOpen(false)} fullWidth icon={<Icon name="play_arrow" size="sm" />} className="text-emerald-600 hover:bg-emerald-50 border-gray-200 hover:border-emerald-200">
                      Run Now
                    </Button>
                  </div>
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

export default Automation;
