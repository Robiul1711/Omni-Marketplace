import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Loader2, AlertCircle } from 'lucide-react';
import PlacementCard from '@/components/sites/home/PlacementCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const MyPlaceMents = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteModalItem, setDeleteModalItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPlacements = useCallback(async () => {
    setLoading(true);
    try {
      let url = '/auth/placements';
      if (statusFilter !== 'all') {
        url += `?status=${statusFilter}`;
      }
      const res = await axiosSecure.get(url);

      let list = [];
      if (Array.isArray(res.data)) {
        list = res.data;
      } else if (Array.isArray(res.data?.data)) {
        list = res.data.data;
      } else if (res.data?.data?.data && Array.isArray(res.data.data.data)) {
        list = res.data.data.data;
      }
      setPlacements(list);
    } catch (err) {
      console.error('Failed to fetch host placements:', err);
      toast.error('Failed to fetch placements.');
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, statusFilter]);

  useEffect(() => {
    fetchPlacements();
  }, [fetchPlacements]);

  const handleEdit = (item) => {
    navigate(`/host/dashboard/edit-placement/${item.id}`);
  };

  const handleDeleteClick = (item) => {
    setDeleteModalItem(item);
  };

  const confirmDelete = async () => {
    if (!deleteModalItem) return;
    setIsDeleting(true);
    try {
      const res = await axiosSecure.delete(`/auth/placements/${deleteModalItem.id}`);
      if (res.data?.status || res.status === 200 || res.status === 204) {
        toast.success(res.data?.message || 'Placement deleted successfully!');
        setDeleteModalItem(null);
        fetchPlacements();
      } else {
        toast.error(res.data?.message || 'Failed to delete placement.');
      }
    } catch (err) {
      console.error('Failed to delete placement:', err);
      toast.error(err?.response?.data?.message || 'Error deleting placement.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] 8 space-y-8">
      <div className=" space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 rounded-2xl bg-white px-8 border border-gray-100 shadow-sm">
          <div>
            <h1 className="text-2xl md:text-[28px] font-bold text-[#101828]">My Placements</h1>
            <p className="text-[#667085] mt-1 text-sm md:text-base">Manage, edit, and track all your host placement offerings.</p>
          </div>
          <Link
            to="/host/dashboard/create-placement"
            className="bg-Primary hover:bg-Primary/90 text-white px-5 py-2.5 rounded-[10px] font-semibold flex items-center justify-center gap-2 transition-all shadow-sm w-full md:w-auto"
          >
            <Plus size={20} strokeWidth={2.5} />
            <span>Create Placement</span>
          </Link>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm">
          {/* Filter Bar */}
          <div className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <h2 className="text-lg font-bold text-[#101828]">
                Total Placements : <span className="ml-1.5 text-[#667085] font-semibold">{placements.length}</span>
              </h2>

              {/* Status Tabs */}
              <div className="hidden sm:flex bg-gray-100 p-1 rounded-xl gap-1">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${statusFilter === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('publish')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${statusFilter === 'publish' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Published
                </button>
                <button
                  onClick={() => setStatusFilter('draft')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${statusFilter === 'draft' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Draft
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val)}>
                <SelectTrigger className="w-[180px] font-semibold text-[#344054] border-[#D0D5DD] rounded-lg h-10">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Placements</SelectItem>
                  <SelectItem value="publish">Published Only</SelectItem>
                  <SelectItem value="draft">Drafts Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grid Section */}
          <div className="p-6">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-500 font-medium">
                <Loader2 className="animate-spin size-8 text-Primary" />
                Fetching placements...
              </div>
            ) : placements.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 bg-gray-50 rounded-full text-gray-400">
                  <AlertCircle size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">No placements found</h3>
                  <p className="text-sm text-gray-500 max-w-sm mt-1">
                    {statusFilter !== 'all'
                      ? `No placements found with status "${statusFilter}". Try changing the filter or create a new placement.`
                      : 'You have not created any advertising placements yet.'}
                  </p>
                </div>
                <Link
                  to="/host/dashboard/create-placement"
                  className="bg-Primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Plus size={18} />
                  Create Your First Placement
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
                {placements.map((item) => (
                  <PlacementCard
                    key={item.id}
                    item={item}
                    isHostView={true}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-3 bg-red-50 rounded-full">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Delete Placement</h3>
            </div>

            <p className="text-sm text-gray-600">
              Are you sure you want to delete <span className="font-bold text-gray-900">"{deleteModalItem.campaign_info?.pl_bus_name || deleteModalItem.title || 'this placement'}"</span>? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteModalItem(null)}
                className="px-4 py-2.5 rounded-xl border border-gray-300 font-semibold text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 font-semibold text-sm text-white flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="animate-spin size-4" />
                    Deleting...
                  </>
                ) : (
                  'Delete Placement'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPlaceMents;