import React, { useRef, useState } from 'react';
import { Upload, Trash2, CheckCircle, X, FileText } from 'lucide-react';

const Step5Upload = ({ register, errors, control }) => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    const newFiles = selectedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2), // Size in MB
      progress: 0,
      status: 'uploading',
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload for each new file
    newFiles.forEach((fileObj) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileObj.id ? { ...f, progress: 100, status: 'completed' } : f
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((f) => (f.id === fileObj.id ? { ...f, progress } : f))
          );
        }
      }, 300);
    });

    // Reset input
    e.target.value = '';
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8 border-t border-gray-100">
      <h2 className="text-xl font-semibold text-[#1a1a1a]">Upload Cover Image</h2>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept="image/png, image/jpeg"
      />

      <div 
        onClick={handleUploadClick}
        className="w-full border-2 border-dashed border-gray-200 rounded-xl p-12 flex flex-col items-center justify-center space-y-4 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <Upload className="size-8 text-gray-400" />
        <p className="text-sm text-gray-600 text-center">
          Drag and drop your file here, or <span className="text-Primary font-medium">click to browse</span> Accepted formats Jpg or PNG
        </p>
      </div>

      <div className="space-y-4">
        {files.map((file) => (
          <div key={file.id} className="p-4 bg-white border border-gray-100 rounded-xl flex items-center gap-4 transition-all duration-300">
            <div className="size-10 bg-blue-50 rounded-lg flex items-center justify-center">
              {file.status === 'completed' ? (
                <FileText className="size-5 text-Primary" />
              ) : (
                <Upload className="size-5 text-Primary animate-bounce" />
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 truncate max-w-[200px] md:max-w-xs">{file.name}</span>
                <button 
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="p-1 hover:bg-gray-50 rounded-full transition-colors"
                >
                  {file.status === 'completed' ? (
                    <Trash2 className="size-4 text-gray-400 hover:text-red-500" />
                  ) : (
                    <X className="size-4 text-gray-400 hover:text-red-500" />
                  )}
                </button>
              </div>
              
              {file.status === 'uploading' && (
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-Primary transition-all duration-300" 
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              )}

              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{file.size} MB / {file.size} MB</span>
                <div className="flex items-center gap-4">
                  {file.status === 'completed' ? (
                    <span className="flex items-center gap-1 text-Primary font-medium">
                      <CheckCircle className="size-3" />
                      Completed
                    </span>
                  ) : (
                    <>
                      <span className="flex items-center gap-1">
                        <span className="size-2 bg-Primary rounded-full animate-pulse" />
                        Loading
                      </span>
                      <span>{file.progress}%</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step5Upload;
