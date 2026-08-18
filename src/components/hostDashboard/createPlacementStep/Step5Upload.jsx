import React, { useRef } from 'react';
import { Upload, Trash2, Image as ImageIcon, Video, Compass, FileText, CheckCircle } from 'lucide-react';

const MediaSection = ({ title, description, accept, isMultiple, files, onFileSelect, onFileRemove, icon: Icon, existingFiles = [] }) => {
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;
    onFileSelect(isMultiple ? selected : selected[0]);
    e.target.value = '';
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-2xl space-y-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-Primary/10 text-Primary rounded-xl">
          <Icon size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept={accept}
        multiple={isMultiple}
        className="hidden"
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        className="w-full border-2 border-dashed border-gray-200 hover:border-Primary/50 rounded-xl p-6 flex flex-col items-center justify-center space-y-2 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <Upload className="size-6 text-gray-400" />
        <p className="text-xs text-gray-600 text-center">
          Click to upload {isMultiple ? 'files' : 'a file'} or drag & drop ({accept})
        </p>
      </div>

      {/* Display Existing Media URLs (when editing) */}
      {existingFiles.length > 0 && (
        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Media:</p>
          <div className="flex flex-wrap gap-3">
            {existingFiles.map((item, idx) => (
              <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200 size-20 bg-gray-100">
                {typeof item === 'string' || item?.url ? (
                  <img
                    src={typeof item === 'string' ? item : item.url}
                    alt="existing media"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 p-1 text-center">
                    Media #{idx + 1}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected New Files List */}
      {files && (Array.isArray(files) ? files.length > 0 : true) && (
        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Newly Selected:</p>
          <div className="space-y-2">
            {(Array.isArray(files) ? files : [files]).map((file, idx) => (
              <div key={idx} className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="size-4 text-Primary shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-gray-800 truncate">{file.name}</p>
                    <p className="text-[10px] text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onFileRemove(idx)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Step5Upload = ({ watch, setValue }) => {
  const coverImage = watch('cover_image');
  const photos = watch('photos') || [];
  const videos = watch('videos') || [];
  const panaromas = watch('panaromas') || [];

  const existingCoverImage = watch('existing_cover_image');
  const existingMedia = watch('existing_media') || [];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8 border-t border-gray-100">
      <h2 className="text-xl font-semibold text-[#1a1a1a]">Media & Files Upload</h2>
      <p className="text-sm text-gray-500">Upload cover image, photo gallery, video teasers, and panoramas.</p>

      <div className="space-y-6">
        {/* Cover Image */}
        <MediaSection
          title="Cover Image (cover_image)"
          description="Main cover picture for placement listing"
          accept="image/png, image/jpeg, image/webp"
          isMultiple={false}
          files={coverImage}
          existingFiles={existingCoverImage ? [existingCoverImage] : []}
          onFileSelect={(file) => setValue('cover_image', file)}
          onFileRemove={() => setValue('cover_image', null)}
          icon={ImageIcon}
        />

        {/* Photos Array */}
        <MediaSection
          title="Photos Gallery (photos[])"
          description="High resolution photo gallery of your placement location"
          accept="image/png, image/jpeg, image/webp"
          isMultiple={true}
          files={photos}
          existingFiles={existingMedia.filter(m => m?.type === 'photo' || !m?.type)}
          onFileSelect={(newFiles) => setValue('photos', [...photos, ...newFiles])}
          onFileRemove={(index) => setValue('photos', photos.filter((_, i) => i !== index))}
          icon={ImageIcon}
        />

        {/* Videos Array */}
        <MediaSection
          title="Video Files (videos[])"
          description="Video previews or showcase clips of the screen / venue"
          accept="video/mp4, video/mov, video/webm"
          isMultiple={true}
          files={videos}
          existingFiles={existingMedia.filter(m => m?.type === 'video')}
          onFileSelect={(newFiles) => setValue('videos', [...videos, ...newFiles])}
          onFileRemove={(index) => setValue('videos', videos.filter((_, i) => i !== index))}
          icon={Video}
        />

        {/* Panoramas Array */}
        <MediaSection
          title="Panorama Views (panaromas[])"
          description="360° or panorama wide shot photos of the space"
          accept="image/png, image/jpeg, image/webp"
          isMultiple={true}
          files={panaromas}
          existingFiles={existingMedia.filter(m => m?.type === 'panorama')}
          onFileSelect={(newFiles) => setValue('panaromas', [...panaromas, ...newFiles])}
          onFileRemove={(index) => setValue('panaromas', panaromas.filter((_, i) => i !== index))}
          icon={Compass}
        />
      </div>
    </div>
  );
};

export default Step5Upload;
