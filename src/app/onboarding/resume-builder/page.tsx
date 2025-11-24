"use client"

import { useRouter } from "next/navigation"
import ResumeBuilderForm from "@/components/resume/resume-builder-form"
import { generateResumePDF } from "@/lib/pdf-generator"

export default function ResumeBuilderPage() {
    const router = useRouter()

    const handleSave = async (data: any) => {
        // TODO: Save to database via server action
        console.log("Saving resume:", data)
        alert("Resume saved! Redirecting to preferences...")
        router.push("/onboarding/preferences")
    }

    const handleExport = (data: any) => {
        generateResumePDF(data)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Build Your ATS-Friendly Resume
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Create a professional resume that passes Applicant Tracking Systems
                    </p>
                </div>

                <ResumeBuilderForm onSave={handleSave} onExport={handleExport} />

                <div className="mt-6 text-center">
                    <button
                        onClick={() => router.push("/onboarding/preferences")}
                        className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        Skip and continue to preferences →
                    </button>
                </div>
            </div>
        </div>
    )
}
