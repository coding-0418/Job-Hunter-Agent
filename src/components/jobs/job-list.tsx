"use client"

import { useState } from "react"
import { Job } from "@/services/crawler/types"
import JobCard from "./job-card"
import { Search, Filter, Play } from "lucide-react"
import { runAutoApply } from "@/app/actions/auto-apply"
import { useRouter } from "next/navigation"

interface JobListProps {
    initialJobs: Job[]
    hasResume: boolean
}

export default function JobList({ initialJobs, hasResume }: JobListProps) {
    const router = useRouter()
    const [jobs, setJobs] = useState<Job[]>(initialJobs)
    const [search, setSearch] = useState("")
    const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set())
    const [applying, setApplying] = useState(false)

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
    )

    const handleJobSelect = (jobId: string, selected: boolean) => {
        const newSelected = new Set(selectedJobs)
        if (selected) {
            newSelected.add(jobId)
        } else {
            newSelected.delete(jobId)
        }
        setSelectedJobs(newSelected)
    }

    const handleAutoApply = async () => {
        if (!hasResume) {
            const shouldBuild = confirm("You need a resume to auto-apply. Would you like to build one now?")
            if (shouldBuild) {
                router.push("/onboarding/resume-builder")
            }
            return
        }

        if (selectedJobs.size === 0) {
            alert("Please select at least one job to apply to")
            return
        }

        setApplying(true)
        try {
            const results = await runAutoApply(Array.from(selectedJobs))
            alert(`Applied to ${results.filter(r => r.status === "SUBMITTED").length} jobs successfully!`)
            setSelectedJobs(new Set())
        } catch (error) {
            alert("Failed to auto-apply. Please try again.")
        } finally {
            setApplying(false)
        }
    }
    return (
        <div className="space-y-6">
            {/* Auto-Apply Button */}
            {selectedJobs.size > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex justify-between items-center">
                    <div>
                        <p className="font-medium text-blue-900 dark:text-blue-100">
                            {selectedJobs.size} job{selectedJobs.size > 1 ? "s" : ""} selected
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            {hasResume ? "Ready to auto-apply" : "Resume required for auto-apply"}
                        </p>
                    </div>
                    <button
                        onClick={handleAutoApply}
                        disabled={applying}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50"
                    >
                        <Play className="w-4 h-4" />
                        {applying ? "Applying..." : "Auto-Apply"}
                    </button>
                </div>
            )}

            {/* Filters */}
            <div className="flex space-x-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Filter className="w-5 h-5 mr-2" />
                    Filters
                </button>
            </div>

            {/* List */}
            <div className="grid gap-4">
                {filteredJobs.map((job) => (
                    <JobCard
                        key={job.externalId}
                        job={job}
                        selected={selectedJobs.has(job.externalId)}
                        onSelect={(selected) => handleJobSelect(job.externalId, selected)}
                    />
                ))}
                {filteredJobs.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No jobs found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    )
}
