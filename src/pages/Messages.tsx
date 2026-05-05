import React, { useState } from "react";
import { Section, Icon, TableToolbar, DataTable, IconButton, SlideOver, Button, Input } from "../components/ui";

const Messages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(new Date("2023-10-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isReplying, setIsReplying] = useState(false);

  const handleView = (message: any) => {
    setSelectedMessage(message);
    setIsReplying(false);
    setIsSlideOverOpen(true);
  };

  const handleReply = (message: any) => {
    setSelectedMessage(message);
    setIsReplying(true);
    setIsSlideOverOpen(true);
  };

  const messages = [
    { id: "MSG-001", sender: "Alice Johnson", subject: "Question about shipping", date: "2023-10-24T10:30:00", status: "Unread", priority: "High" },
    { id: "MSG-002", sender: "Bob Smith", subject: "Return request for order #1234", date: "2023-10-23T14:15:00", status: "Read", priority: "Medium" },
    { id: "MSG-003", sender: "Charlie Brown", subject: "Feedback on new product", date: "2023-10-22T09:45:00", status: "Read", priority: "Low" },
    { id: "MSG-004", sender: "Diana Prince", subject: "Address update needed", date: "2023-10-21T16:20:00", status: "Unread", priority: "High" },
    { id: "MSG-005", sender: "Ethan Hunt", subject: "Bulk order inquiry", date: "2023-10-20T11:05:00", status: "Read", priority: "Medium" },
  ];

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { bg: string; text: string; dot: string; }> = {
      "Unread": { bg: "bg-pink-100", text: "text-pink-700", dot: "bg-pink-500" },
      "Read": { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" },
    };
    return configs[status] || { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-500" };
  };

  return (
    <main className="pb-8 px-8 min-h-screen animate-in fade-in duration-500">
      <Section title="Communication Center" accentColor="pink">
        <TableToolbar
          searchLabel="Search"
          searchPlaceholder="Search messages, senders, subjects..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          onSearchSubmit={() => console.log("Searching for:", searchQuery)}
          onAddNew={() => console.log("Composing new message")}
          addNewLabel="Compose Message"
          className="mb-8"
        />

        <DataTable
          data={messages}
          onExport={() => console.log("Exporting...")}
          showingLabel="messages"
          columns={[
            {
              header: "Message ID",
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
                      {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                      at {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              },
              className: "w-32",
            },
            {
              header: "Sender",
              accessor: "sender",
              className: "font-bold text-gray-900",
            },
            {
              header: "Subject",
              accessor: "subject",
              className: "text-gray-600 font-medium",
            },
            {
              header: "Priority",
              accessor: "priority",
              className: "font-bold text-gray-900",
            },
            {
              header: "Status",
              accessor: (row) => {
                const config = getStatusConfig(row.status);
                return (
                  <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl ${config.bg} ${config.text} border border-white transition-all duration-300 cursor-default group`}>
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute w-2 h-2 rounded-full opacity-40 ${row.status === 'Unread' ? 'animate-ping' : ''} ${config.dot}`} />
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
                    className="text-gray-400 hover:text-pink-600 hover:bg-pink-50"
                  />
                  <IconButton
                    icon={<Icon name="reply" size="sm" />}
                    onClick={() => handleReply(row)}
                    className="text-gray-400 hover:text-pink-600 hover:bg-pink-50"
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
        title={isReplying ? "Reply to Message" : "Message Details"}
      >
        {selectedMessage && (
          <div className="flex flex-col h-full">
            <div className="bg-pink-50 rounded-2xl p-5 border border-pink-100 flex items-center justify-between mb-6 shrink-0">
              <div>
                <p className="text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-0.5">Priority</p>
                <p className="text-2xl font-black text-pink-600 leading-none">{selectedMessage.priority}</p>
              </div>
              {(() => {
                const config = getStatusConfig(selectedMessage.status);
                return (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${config.bg} ${config.text} border border-white shadow-sm shrink-0`}>
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute w-1.5 h-1.5 rounded-full opacity-40 ${selectedMessage.status === 'Unread' ? 'animate-ping' : ''} ${config.dot}`} />
                      <span className={`relative w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider">{selectedMessage.status}</span>
                  </div>
                );
              })()}
            </div>

            <div className="flex-1 overflow-hidden flex flex-col justify-between">
              <div className="grid grid-cols-1 gap-2 overflow-hidden">
                {isReplying ? (
                  <>
                    <Input label="To" defaultValue={selectedMessage.sender} disabled />
                    <Input label="Subject" defaultValue={`Re: ${selectedMessage.subject}`} />
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-gray-700">Message</label>
                      <textarea
                        className="w-full h-32 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all resize-none"
                        placeholder="Type your reply here..."
                      ></textarea>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <DetailItem label="Message ID" value={selectedMessage.id} />
                    <DetailItem label="Sender" value={selectedMessage.sender} />
                    <DetailItem label="Date" value={new Date(selectedMessage.date).toLocaleString()} />
                    <DetailItem label="Subject" value={selectedMessage.subject} />
                    <div className="border-b border-gray-50 pb-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Message Content</p>
                      <div className="text-sm text-gray-600">
                        Hello, I have a quick question about the shipping time for my recent order. It says pending but I'd love to get it by next week if possible. Thanks!
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 shrink-0">
                {isReplying ? (
                  <div className="flex gap-3">
                    <Button onClick={() => setIsSlideOverOpen(false)} fullWidth className="bg-pink-600 hover:bg-pink-700 border-pink-600 focus:ring-pink-500/20">Send Reply</Button>
                    <Button variant="secondary" onClick={() => setIsSlideOverOpen(false)} fullWidth>Cancel</Button>
                  </div>
                ) : (
                  <Button variant="secondary" onClick={() => handleReply(selectedMessage)} fullWidth icon={<Icon name="reply" size="sm" />} className="text-pink-600 hover:bg-pink-50 border-gray-200 hover:border-pink-200">
                    Reply to Message
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

export default Messages;
