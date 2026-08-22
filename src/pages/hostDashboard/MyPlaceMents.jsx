import React, { useState, useMemo } from 'react';
import { Plus, Loader2, AlertCircle } from 'lucide-react';
import PlacementCard from '@/components/sites/home/PlacementCard';
import PlacementCardSkeleton from '@/components/sites/home/PlacementSkeleton';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import useClient from '@/hooks/useClient';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const MyPlaceMents = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteModalItem, setDeleteModalItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [publishingId, setPublishingId] = useState(null);

  // Cached data fetch with React Query
  const { data: rawData, isLoading, refetch } = useClient({
    queryKey: ["hostPlacements"],
    url: "/auth/placements",
    isPrivate: true,
  });

  const placements = useMemo(() => {
    if (!rawData) return [];
    if (Array.isArray(rawData)) return rawData;
    if (Array.isArray(rawData?.data)) return rawData.data;
    if (Array.isArray(rawData?.data?.data)) return rawData.data.data;
    return [];
  }, [rawData]);

  // Count stats for each status enum
  const counts = useMemo(() => {
    const res = { all: placements.length, pending: 0, approved: 0, reject: 0, draft: 0 };
    placements.forEach((item) => {
      const s = (item.status || 'draft').toLowerCase();
      if (s === 'approved' || s === 'publish' || s === 'published' || s === 'active') {
        res.approved++;
      } else if (s === 'pending') {
        res.pending++;
      } else if (s === 'reject' || s === 'rejected') {
        res.reject++;
      } else if (s === 'draft') {
        res.draft++;
      }
    });
    return res;
  }, [placements]);

  // Robust client side filtering based on selected status filter
  const displayedPlacements = useMemo(() => {
    return placements.filter((item) => {
      if (statusFilter === 'all') return true;
      const s = (item.status || 'draft').toLowerCase();
      if (statusFilter === 'approved') {
        return s === 'approved' || s === 'publish' || s === 'active' || s === 'published';
      }
      if (statusFilter === 'pending') {
        return s === 'pending';
      }
      if (statusFilter === 'reject') {
        return s === 'reject' || s === 'rejected';
      }
      if (statusFilter === 'draft') {
        return s === 'draft';
      }
      return s === statusFilter.toLowerCase();
    });
  }, [placements, statusFilter]);

  const handleEdit = (item) => {
    navigate(`/host/dashboard/edit-placement/${item.id}`);
  };

  const handlePublish = async (item) => {
    const slugOrId = item.slug || item.id;
    setPublishingId(item.id);
    try {
      const res = await axiosSecure.patch(`/auth/placements/${slugOrId}/status`, {
        status: "pending",
      });

      if (res.data?.status || res.status === 200 || res.status === 204) {
        toast.success(res.data?.message || "Placement submitted successfully!");
        await queryClient.invalidateQueries({ queryKey: ["hostPlacements"] });
        refetch();
      } else {
        toast.error(res.data?.message || "Failed to submit placement.");
      }
    } catch (err) {
      console.error("Failed to submit placement:", err);
      toast.error(err?.response?.data?.message || "Error submitting placement.");
    } finally {
      setPublishingId(null);
    }
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
        await queryClient.invalidateQueries({ queryKey: ["hostPlacements"] });
        refetch();
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

  const statusTabs = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'pending', label: 'Pending', count: counts.pending },
    { key: 'approved', label: 'Published', count: counts.approved },
    { key: 'reject', label: 'Rejected', count: counts.reject },
    { key: 'draft', label: 'Draft', count: counts.draft },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] space-y-8">
      <div className="space-y-8">
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
          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-[#101828]">
              Total Placements : <span className="ml-1.5 text-[#667085] font-semibold">{displayedPlacements.length}</span>
            </h2>

            {/* Status Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl gap-1 overflow-x-auto">
              {statusTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setStatusFilter(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                    statusFilter === tab.key
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      statusFilter === tab.key
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-gray-200/80 text-gray-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid Section */}
          <div className="p-6">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
                {Array.from({ length: 8 }).map((_, index) => (
                  <PlacementCardSkeleton key={index} />
                ))}
              </div>
            ) : displayedPlacements.length === 0 ? (
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
                {displayedPlacements.map((item) => (
                  <PlacementCard
                    key={item.id}
                    item={item}
                    isHostView={true}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                    onPublish={handlePublish}
                    isPublishing={publishingId === item.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalItem && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in duration-200 z-10">
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