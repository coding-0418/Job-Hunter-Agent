"use client"

import { useRouter } from "next/navigation"
import { FileText, PlusCircle } from "lucide-react"

export default function ResumeCheckPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Let&apos;s Get Started!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Do you have a resume ready?
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <button
                        onClick={() => router.push("/onboarding/resume-upload")}
                        className="group p-8 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all"
                    >
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Yes, I have one
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Upload your existing resume and we&apos;ll help you find matching jobs
                                </p>
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => router.push("/onboarding/resume-builder-choice")}
                        className="group p-8 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-green-500 dark:hover:border-green-400 hover:shadow-lg transition-all"
                    >
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <PlusCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    No, I don&apos;t
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    We&apos;ll help you create an ATS-friendly resume or continue without one
                                </p>
                            </div>
                        </div>
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Don&apos;t worry, you can always update this later
                    </p>
                </div>
            </div>
        </div>
    )
}
