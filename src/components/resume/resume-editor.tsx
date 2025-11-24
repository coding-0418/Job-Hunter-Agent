"use client"

import { useState, useEffect } from "react"
import { Save, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ResumeData {
    name?: string
    email?: string
    phone?: string
    summary?: string
    experience?: string
    education?: string
    skills?: string
}

export default function ResumeEditor() {
    const [data, setData] = useState<ResumeData>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Load data from local storage or API
        const stored = localStorage.getItem("currentResume")
        if (stored) {
            try {
                setData(JSON.parse(stored))
            } catch (e) {
                console.error("Failed to parse resume data", e)
            }
        }
        setLoading(false)
    }, [])

    const handleChange = (field: keyof ResumeData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }))
    }

    const handleSave = () => {
        localStorage.setItem("currentResume", JSON.stringify(data))
        alert("Resume saved locally!")
        // In real app, save to DB
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/dashboard/resumes" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Resume Editor</h2>
                </div>
                <div className="flex space-x-3">
                    <button onClick={handleSave} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                    </button>
                    <button className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={data.name || ""}
                                onChange={(e) => handleChange("name", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                value={data.email || ""}
                                onChange={(e) => handleChange("email", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                            <input
                                type="text"
                                value={data.phone || ""}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Professional Summary</label>
                        <textarea
                            value={data.summary || ""}
                            onChange={(e) => handleChange("summary", e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Experience</label>
                        <textarea
                            value={data.experience || ""}
                            onChange={(e) => handleChange("experience", e.target.value)}
                            rows={6}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="Job Title at Company..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Education</label>
                        <textarea
                            value={data.education || ""}
                            onChange={(e) => handleChange("education", e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="Degree at University..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills</label>
                        <textarea
                            value={data.skills || ""}
                            onChange={(e) => handleChange("skills", e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="React, Node.js, TypeScript..."
                        />
                    </div>
                </div>

                {/* Preview */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 min-h-[800px] text-gray-900">
                    <div className="text-center border-b border-gray-200 pb-6 mb-6">
                        <h1 className="text-3xl font-bold uppercase tracking-wide text-gray-800">{data.name || "Your Name"}</h1>
                        <div className="mt-2 text-sm text-gray-600 flex justify-center space-x-4">
                            {data.email && <span>{data.email}</span>}
                            {data.phone && <span>{data.phone}</span>}
                        </div>
                    </div>

                    {data.summary && (
                        <div className="mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 border-b border-gray-100 pb-1">Summary</h3>
                            <p className="text-sm leading-relaxed">{data.summary}</p>
                        </div>
                    )}

                    {data.experience && (
                        <div className="mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 border-b border-gray-100 pb-1">Experience</h3>
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">{data.experience}</div>
                        </div>
                    )}

                    {data.education && (
                        <div className="mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 border-b border-gray-100 pb-1">Education</h3>
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">{data.education}</div>
                        </div>
                    )}

                    {data.skills && (
                        <div className="mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 border-b border-gray-100 pb-1">Skills</h3>
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">{data.skills}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
