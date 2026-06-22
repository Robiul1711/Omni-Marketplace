import React, { useState, useRef, useEffect } from 'react';
import { FiMessageSquare, FiPlus, FiArrowLeft, FiSend, FiClock, FiCheckCircle, FiCheck, FiX, FiPaperclip, FiBriefcase, FiGrid } from 'react-icons/fi';

const Support = () => {
  const [tickets, setTickets] = useState([
    {
      id: "TK-4521",
      subject: "Payout delay for Campaign #12304",
      category: "Billing & Payouts",
      status: "In Progress",
      date: "14 Feb",
      messages: [
        { sender: "host", text: "Hello, my payout for the campaign has not been deposited in my bank account yet. It has been 5 days.", time: "10:30 AM" },
        { sender: "support", text: "Hi, thank you for reaching out. We are verifying the bank deposit status with Stripe. We will update you shortly.", time: "11:15 AM" }
      ]
    },
    {
      id: "TK-3108",
      subject: "Unable to upload cover image in step 5",
      category: "Technical Support",
      status: "Closed",
      date: "12 Feb",
      messages: [
        { sender: "host", text: "When uploading a 5MB image, the upload progress gets stuck. Is there a file format limit?", time: "09:00 AM" },
        { sender: "support", text: "Hello! Currently, we accept only JPG or PNG formats up to 5MB. Please check your image format and try again.", time: "10:00 AM" },
        { sender: "host", text: "Got it, that worked. Thanks!", time: "10:30 AM" }
      ]
    }
  ]);

  const [activeTicketId, setActiveTicketId] = useState("TK-4521");
  const [mobileView, setMobileView] = useState("list"); // 'list' | 'details'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  
  // Modal states
  const [newSubject, setNewSubject] = useState("");
  const [newCategory, setNewCategory] = useState("Technical Support");
  const [newDesc, setNewDesc] = useState("");

  const chatEndRef = useRef(null);
  const activeTicket = tickets.find(t => t.id === activeTicketId) || tickets[0];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeTicket?.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeTicket) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgObj = { sender: "host", text: newMessage, time };

    // Update tickets
    setTickets(prev => prev.map(t => {
      if (t.id === activeTicket.id) {
        return {
          ...t,
          messages: [...t.messages, msgObj]
        };
      }
      return t;
    }));

    setNewMessage("");

    // Simulate auto support response
    setTimeout(() => {
      const autoReply = {
        sender: "support",
        text: "Thanks for the message! Our support team has received your update and will reply shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setTickets(prev => prev.map(t => {
        if (t.id === activeTicket.id) {
          return {
            ...t,
            messages: [...t.messages, autoReply]
          };
        }
        return t;
      }));
    }, 1000);
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newSubject.trim() || !newDesc.trim()) return;

    const newId = `TK-${Math.floor(1000 + Math.random() * 9000)}`;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const ticketObj = {
      id: newId,
      subject: newSubject,
      category: newCategory,
      status: "Open",
      date: "Today",
      messages: [
        { sender: "host", text: newDesc, time }
      ]
    };

    setTickets([ticketObj, ...tickets]);
    setActiveTicketId(newId);
    setNewSubject("");
    setNewDesc("");
    setIsModalOpen(false);
    setMobileView("details");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-50 text-[#3366FF] border-blue-100';
      case 'In Progress':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Closed':
        return 'bg-gray-50 text-gray-500 border-gray-100';
      default:
        return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] min-h-[500px] flex flex-col md:flex-row gap-6 relative font-host-grotesk">
      
      {/* Left panel: Tickets list */}
      <div className={`w-full md:w-[350px] lg:w-[400px] flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm ${
        mobileView === 'details' ? 'hidden md:flex' : 'flex'
      }`}>
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Support Center</h1>
            <p className="text-xs text-gray-400 mt-0.5">Manage your tickets</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-Primary hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all hover:scale-102 active:scale-98 shadow-md shadow-blue-100"
          >
            <FiPlus className="size-3.5" />
            New Ticket
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50 p-4 space-y-2">
          {tickets.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">
              No tickets found.
            </div>
          ) : (
            tickets.map(ticket => {
              const isActive = ticket.id === activeTicketId;
              const lastMsg = ticket.messages[ticket.messages.length - 1];
              return (
                <div
                  key={ticket.id}
                  onClick={() => {
                    setActiveTicketId(ticket.id);
                    setMobileView("details");
                  }}
                  className={`p-4 rounded-2xl cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-Primary/5 border border-Primary/10 shadow-sm' 
                      : 'hover:bg-gray-50/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-gray-400">{ticket.id}</span>
                    <span className="text-xs font-semibold text-gray-400">{ticket.date}</span>
                  </div>
                  
                  <h3 className={`text-sm font-bold truncate mb-1 ${isActive ? 'text-Primary' : 'text-gray-800'}`}>
                    {ticket.subject}
                  </h3>

                  <p className="text-xs text-gray-500 truncate mb-3">
                    {lastMsg ? lastMsg.text : ""}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                      {ticket.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Right panel: Conversations */}
      <div className={`flex-1 flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm ${
        mobileView === 'list' ? 'hidden md:flex' : 'flex'
      }`}>
        {activeTicket ? (
          <>
            {/* Right Panel Header */}
            <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white">
              <div className="flex items-center gap-4 min-w-0">
                {/* Back button on mobile */}
                <button
                  onClick={() => setMobileView("list")}
                  className="md:hidden p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-500"
                >
                  <FiArrowLeft className="size-5" />
                </button>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400">{activeTicket.id}</span>
                    <span className="text-[10px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                      {activeTicket.category}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-gray-800 truncate">{activeTicket.subject}</h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(activeTicket.status)}`}>
                  {activeTicket.status}
                </span>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 p-6 overflow-y-auto bg-[#F9FAFB]/30 flex flex-col gap-4">
              <div className="text-center my-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-white border border-gray-100 px-3 py-1 rounded-full shadow-sm">
                  Ticket Created
                </span>
              </div>

              {activeTicket.messages.map((msg, index) => {
                const isSupport = msg.sender === 'support';
                return (
                  <div
                    key={index}
                    className={`flex gap-3 max-w-[80%] ${isSupport ? 'self-start' : 'self-end flex-row-reverse'}`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                      isSupport ? 'bg-Primary shadow-sm' : 'bg-gray-800'
                    }`}>
                      {isSupport ? "S" : "H"}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className={`p-4 rounded-2xl shadow-sm text-sm ${
                        isSupport 
                          ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-none' 
                          : 'bg-Primary text-white rounded-tr-none'
                      }`}>
                        <p className="leading-relaxed">{msg.text}</p>
                      </div>
                      <span className={`text-[10px] text-gray-400 font-medium ${isSupport ? 'text-left' : 'text-right'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-50 bg-white">
              <div className="flex items-center gap-3 bg-[#F8F9FC] p-2.5 rounded-2xl border border-gray-100">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-800 placeholder:text-gray-400 px-2"
                />
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors"
                  title="Attach file"
                >
                  <FiPaperclip className="size-4" />
                </button>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="w-10 h-10 bg-Primary hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors shadow-md shadow-blue-100 shrink-0"
                >
                  <FiSend className="size-4" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-400">
            <FiMessageSquare className="size-12 text-gray-200 mb-3" />
            <p className="text-sm">Select a support ticket to view conversation</p>
          </div>
        )}
      </div>

      {/* Ticket Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsModalOpen(false)} />
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-[500px] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 z-10">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Create Support Ticket</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-gray-600"
              >
                <FiX className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="p-6 space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Subject</label>
                <input
                  type="text"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="E.g., Payout issue on my dashboard"
                  className="h-12 px-4 rounded-xl border border-gray-200 focus:border-Primary outline-none text-sm transition-all bg-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="h-12 px-4 rounded-xl border border-gray-200 focus:border-Primary outline-none text-sm transition-all bg-white"
                >
                  <option value="Technical Support">Technical Support</option>
                  <option value="Billing & Payouts">Billing & Payouts</option>
                  <option value="Account Settings">Account Settings</option>
                  <option value="Placement Inquiries">Placement Inquiries</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  required
                  rows={4}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe your issue or query in details..."
                  className="p-4 rounded-xl border border-gray-200 focus:border-Primary outline-none text-sm transition-all resize-none bg-white"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 h-12 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-12 bg-Primary hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-md shadow-blue-100"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
