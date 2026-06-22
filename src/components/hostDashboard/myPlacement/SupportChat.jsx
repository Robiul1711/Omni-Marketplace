import React, { useState } from "react";
import { HiOutlineChatAlt2, HiOutlineX, HiOutlinePaperClip } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import { FiHeadphones } from "react-icons/fi";

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[500]">
      {/* Chat Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 md:w-14 md:h-14 bg-[#3366FF] text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-400 hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <HiOutlineX className="text-xl md:text-2xl" /> : <FiHeadphones className="text-xl md:text-2xl" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed md:absolute bottom-20 right-4 left-4 md:left-auto md:right-0 md:w-[400px] h-[calc(100vh-120px)] md:h-auto bg-white rounded-3xl shadow-2xl border border-[#F4F4F4] overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-6 flex items-center justify-between border-b border-[#F4F4F4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3366FF] text-white rounded-full flex items-center justify-center">
                <FiHeadphones className="text-xl" />
              </div>
              <h3 className="text-[#1A1D1F] font-bold text-lg">Support System</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#6F767E] hover:text-[#1A1D1F]">
              <HiOutlineX className="text-2xl" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 h-[400px] overflow-y-auto bg-[#F8F9FC]/50 flex flex-col gap-6 custom-scrollbar">
            <div className="text-center">
              <span className="text-[10px] font-bold text-[#6F767E] uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm">Today</span>
            </div>

            {/* Support Message */}
            <div className="flex flex-col gap-2 items-start">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] border border-[#F4F4F4]">
                <p className="text-sm text-[#1A1D1F]">Hey Kabir 👋</p>
              </div>
              <div className="flex items-end gap-2">
                <div className="w-8 h-8 bg-[#3366FF] text-white rounded-full flex items-center justify-center shrink-0">
                  <FiHeadphones className="text-sm" />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] border border-[#F4F4F4]">
                  <p className="text-sm text-[#1A1D1F]">How Can I help you?</p>
                </div>
                <span className="text-[10px] text-[#6F767E] font-medium mb-1">03:15</span>
              </div>
            </div>

            {/* User Message */}
            <div className="flex flex-col gap-2 items-end">
              <div className="bg-[#3366FF] p-4 rounded-2xl rounded-tr-none shadow-lg shadow-blue-100 max-w-[80%]">
                <p className="text-sm text-white text-right">Hello 👋</p>
              </div>
              <div className="flex items-end gap-2 flex-row-reverse">
                <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" className="w-8 h-8 rounded-full shrink-0" />
                <div className="bg-[#3366FF] p-4 rounded-2xl rounded-tr-none shadow-lg shadow-blue-100 max-w-[80%]">
                  <p className="text-sm text-white text-right">I need some information</p>
                </div>
                <span className="text-[10px] text-[#6F767E] font-medium mb-1">03:15</span>
              </div>
            </div>

            {/* Suggestions */}
            <div className="flex gap-2 mt-4">
              <button className="px-4 py-2.5 bg-white border border-[#EFEFEF] rounded-xl text-xs font-bold text-[#1A1D1F] hover:bg-gray-50 transition-colors shadow-sm">
                I want to know some information
              </button>
              <button className="px-4 py-2.5 bg-white border border-[#EFEFEF] rounded-xl text-xs font-bold text-[#1A1D1F] hover:bg-gray-50 transition-colors shadow-sm">
                I need Support
              </button>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-[#F4F4F4]">
            <div className="flex items-center gap-3 bg-[#F8F9FC] p-3 rounded-2xl border border-[#F4F4F4]">
              <input
                type="text"
                placeholder="Ask anything..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-[#1A1D1F] placeholder:text-[#6F767E]"
              />
              <button className="text-[#6F767E] hover:text-[#1A1D1F] transition-colors">
                <HiOutlinePaperClip className="text-2xl rotate-45" />
              </button>
              <button className="w-10 h-10 bg-[#3366FF] text-white rounded-xl flex items-center justify-center hover:bg-[#254EDB] transition-colors shadow-lg shadow-blue-100">
                <IoSend className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChat;
