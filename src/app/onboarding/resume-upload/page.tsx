"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import UploadDropzone from "@/components/resume/upload-dropzone"

export default function ResumeUploadPage() {
    const router = useRouter()
    const [uploaded, setUploaded] = useState(false)

    const handleUploadSuccess = () => {
        setUploaded(true)
        // Redirect to preferences after a short delay
        setTimeout(() => {
            router.push("/onboarding/preferences")
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Upload Your Resume
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        We&apos;ll parse your resume to help match you with the best jobs
                    </p>
                </div>

                <UploadDropzone onUploadSuccess={handleUploadSuccess} />

                {uploaded && (
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 text-center">
                        ✓ Resume uploaded successfully! Redirecting...
                    </div>
                )}

                <div className="mt-6 text-center">
                    <button
                        onClick={() => router.push("/onboarding/preferences")}
                        className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        Skip for now →
                    </button>
                </div>
            </div>
        </div>
    )
}
