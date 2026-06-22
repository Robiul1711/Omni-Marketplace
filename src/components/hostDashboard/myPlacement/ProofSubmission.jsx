import React from "react";
import { HiOutlinePaperClip, HiOutlineUpload, HiOutlineTrash, HiOutlineCheckCircle } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ProofSubmission = () => {
  return (
    <div className="bg-white p-4 md:p-8 rounded-2xl border border-[#F4F4F4] shadow-sm mb-8">
      <h2 className="text-xl font-bold text-[#1A1D1F] mb-6">Order Progress</h2>

      {/* Info Alert */}
      <div className="bg-[#F0F5FF] p-4 rounded-xl mb-8">
        <p className="text-[#3366FF] text-xs md:text-sm leading-relaxed">
          The host has submitted proof of campaign completion. Please review and approve or request revisions.
        </p>
      </div>

      {/* Proof Link */}
      <div className="mb-8">
        <label className="block text-[#1A1D1F] font-bold text-sm mb-3">Proof Link:</label>
        <div className="relative">
          <input
            type="text"
            placeholder="https://instagram.com/story/example"
            className="w-full px-4 py-3 bg-white border border-[#EFEFEF] rounded-xl text-xs md:text-sm text-[#1A1D1F] placeholder:text-[#6F767E] focus:outline-none focus:border-[#3366FF] transition-colors pr-10"
          />
          <HiOutlinePaperClip className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6F767E] text-xl" />
        </div>
      </div>

      {/* Drop Information */}
      <div className="mb-8">
        <label className="block text-[#1A1D1F] font-bold text-sm mb-3">Drop Information</label>
        <div className="border-2 border-dashed border-[#EFEFEF] rounded-2xl p-6 md:p-12 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#3366FF] transition-colors group">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F8F9FC] flex items-center justify-center group-hover:bg-[#F0F5FF] transition-colors">
            <HiOutlineUpload className="text-xl md:text-2xl text-[#6F767E] group-hover:text-[#3366FF]" />
          </div>
          <div className="text-center">
            <p className="text-xs md:text-sm font-medium text-[#1A1D1F]">
              Drag and drop your file here, or click to browse
            </p>
            <p className="text-[10px] md:text-xs text-[#6F767E] mt-1">
              Accepted formats PDF, DOCX or PNG
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="flex flex-col gap-4">
        {/* Completed File */}
        <div className="p-3 md:p-4 border border-[#EFEFEF] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 bg-[#F8F9FC] rounded-lg flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-[#6F767E]">PDF</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#1A1D1F] truncate">Certificate.pdf</p>
              <p className="text-xs text-[#6F767E]">20 MB / 20 MB</p>
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0">
            <div className="flex items-center gap-1.5 text-[#3366FF]">
              <HiOutlineCheckCircle className="text-lg" />
              <span className="text-xs font-bold">Completed</span>
            </div>
            <button className="text-[#6F767E] hover:text-red-500 transition-colors">
              <HiOutlineTrash className="text-lg" />
            </button>
          </div>
        </div>

        {/* Loading File */}
        <div className="p-3 md:p-4 border border-[#EFEFEF] rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-3">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 bg-[#F8F9FC] rounded-lg flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-[#6F767E]">PDF</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#1A1D1F] truncate">Certificate.pdf</p>
                <p className="text-xs text-[#6F767E]">20 MB / 20 MB</p>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0">
              <div className="flex items-center gap-1.5 text-[#6F767E]">
                <div className="w-4 h-4 border-2 border-[#EFEFEF] border-t-[#3366FF] rounded-full animate-spin"></div>
                <span className="text-xs font-bold">Loading</span>
              </div>
              <button className="text-[#6F767E] hover:text-[#1A1D1F]">
                <IoIosCloseCircleOutline size={20} />
              </button>
            </div>
          </div>
          <div className="relative w-full h-1.5 bg-[#F4F4F4] rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-[#3366FF] rounded-full transition-all duration-500" style={{ width: "70%" }}></div>
          </div>
          <div className="mt-2 flex justify-end">
            <span className="text-[10px] font-bold text-[#6F767E]">70%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProofSubmission;
