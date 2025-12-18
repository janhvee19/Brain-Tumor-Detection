import React, { useState, useRef } from 'react';
import { Upload, X, FileImage } from 'lucide-react';

const ImageUpload = ({ onImageSelect, isProcessing }) => {
    const [preview, setPreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onImageSelect(file, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setPreview(null);
        onImageSelect(null, null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            {!preview ? (
                <div
                    className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ease-in-out ${dragActive
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-slate-600 hover:border-slate-500 bg-slate-800/50"
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleChange}
                        disabled={isProcessing}
                    />

                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="p-4 bg-slate-700 rounded-full">
                            <Upload className="h-8 w-8 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-lg font-medium text-white">
                                Drop your MRI scan here
                            </p>
                            <p className="text-sm text-slate-400 mt-1">
                                or click to browse
                            </p>
                        </div>
                        <button
                            onClick={() => inputRef.current?.click()}
                            disabled={isProcessing}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Select File
                        </button>
                    </div>
                </div>
            ) : (
                <div className="relative bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
                    <button
                        onClick={clearImage}
                        disabled={isProcessing}
                        className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-10"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-64 object-contain bg-black"
                    />
                    <div className="p-4 bg-slate-800 border-t border-slate-700 flex items-center">
                        <FileImage className="h-5 w-5 text-blue-400 mr-2" />
                        <span className="text-sm text-slate-300">MRI Scan Selected</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
