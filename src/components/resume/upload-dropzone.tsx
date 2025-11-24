"use client"

import { useState, useRef } from "react"
import { Upload, File, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { uploadAndParseResume } from "@/app/actions/resume"
import { useRouter } from "next/navigation"

export default function UploadDropzone() {
    const router = useRouter()
    const [isDragging, setIsDragging] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile && droppedFile.type === "application/pdf") {
            setFile(droppedFile)
            setError(null)
        } else {
            setError("Please upload a PDF file.")
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile)
            setError(null)
        } else if (selectedFile) {
            setError("Please upload a PDF file.")
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setUploading(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append("file", file)

            const result = await uploadAndParseResume(formData)

            if (result.error) {
                setError(result.error)
            } else {
                // Store in localStorage for the builder to pick up
                localStorage.setItem("currentResume", JSON.stringify(result.data))
                router.push("/dashboard/resumes/builder")
            }
        } catch {
            setError("An unexpected error occurred")
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="w-full">
            <div
                className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
                    isDragging
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:border-blue-400"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileSelect}
                />

                {file ? (
                    <div className="flex flex-col items-center">
                        <File className="w-12 h-12 text-blue-500 mb-4" />
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setFile(null)
                            }}
                            className="mt-4 text-sm text-red-500 hover:text-red-600"
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <Upload className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF only (max 5MB)</p>
                    </div>
                )}
            </div>

            {error && (
                <div className="mt-4 flex items-center text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                </div>
            )}

            {file && (
                <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {uploading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Uploading...
                        </>
                    ) : (
                        "Upload & Parse"
                    )}
                </button>
            )}
        </div>
    )
}
