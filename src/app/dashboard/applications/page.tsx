"use client"

import { useState } from "react"
import { runAutoApply } from "@/app/actions/auto-apply"
import { Play, CheckCircle, AlertTriangle, XCircle } from "lucide-react"

// Mock data for demo
const initialApplications = [
    { id: "1", jobTitle: "Senior Frontend Engineer", company: "TechCorp", status: "SELECTED" },
    { id: "2", jobTitle: "Backend Developer", company: "StartupInc", status: "SELECTED" },
    { id: "3", jobTitle: "Full Stack Engineer", company: "RemoteFirst", status: "APPLIED", applyStatus: "SUBMITTED" },
]

export default function ApplicationsPage() {
    const [applications, setApplications] = useState(initialApplications)
    const [processing, setProcessing] = useState(false)

    const handleRunAutoApply = async () => {
        setProcessing(true)
        const selectedIds = applications.filter(a => a.status === "SELECTED").map(a => a.id)

        if (selectedIds.length === 0) {
            alert("No jobs selected to apply")
            setProcessing(false)
            return
        }

        const results = await runAutoApply(selectedIds)

        // Update local state based on results
        setApplications(prev => prev.map(app => {
            const result = results.find(r => r.jobId === app.id)
            if (result) {
                return { ...app, status: "APPLIED", applyStatus: result.status, notes: result.notes }
            }
            return app
        }))

        setProcessing(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Applications</h2>
                    <p className="text-gray-500 dark:text-gray-400">Track your application status.</p>
                </div>
                <button
                    onClick={handleRunAutoApply}
                    disabled={processing}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                    {processing ? (
                        <>Processing...</>
                    ) : (
                        <>
                            <Play className="w-4 h-4 mr-2" />
                            Auto-Apply to Selected
                        </>
                    )}
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Job</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Company</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Result</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {applications.map((app) => (
                            <tr key={app.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{app.jobTitle}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{app.company}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${app.status === 'SELECTED' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {app.applyStatus === 'SUBMITTED' && (
                                        <div className="flex items-center text-green-600">
                                            <CheckCircle className="w-4 h-4 mr-1" /> Submitted
                                        </div>
                                    )}
                                    {app.applyStatus === 'MANUAL_ACTION_REQUIRED' && (
                                        <div className="flex items-center text-yellow-600">
                                            <AlertTriangle className="w-4 h-4 mr-1" /> Manual Action
                                        </div>
                                    )}
                                    {app.applyStatus === 'FAILED' && (
                                        <div className="flex items-center text-red-600">
                                            <XCircle className="w-4 h-4 mr-1" /> Failed
                                        </div>
                                    )}
                                    {!app.applyStatus && app.status === 'SELECTED' && (
                                        <span className="text-gray-400">Ready to apply</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
