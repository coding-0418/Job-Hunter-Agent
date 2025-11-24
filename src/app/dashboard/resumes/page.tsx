import UploadDropzone from "@/components/resume/upload-dropzone"

export default function ResumesPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Resumes</h2>
                <p className="text-gray-500 dark:text-gray-400">Manage your resumes and create new ones.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upload Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Upload Resume</h3>
                    <UploadDropzone />
                </div>

                {/* Builder Card (Placeholder) */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 opacity-50">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Resume Builder</h3>
                    <p className="text-gray-500 mb-4">Create a resume from scratch using our templates.</p>
                    <button disabled className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg cursor-not-allowed">
                        Coming Soon
                    </button>
                </div>
            </div>

            {/* Resume List (Placeholder) */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Resumes</h3>
                </div>
                <div className="p-6 text-center text-gray-500">
                    No resumes uploaded yet.
                </div>
            </div>
        </div>
    )
}
