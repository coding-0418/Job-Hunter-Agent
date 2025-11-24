"use client"

import { useState } from "react"
import { Job } from "@/services/crawler/types"
import JobCard from "./job-card"
import { Search, Filter } from "lucide-react"

interface JobListProps {
    initialJobs: Job[]
}

export default function JobList({ initialJobs }: JobListProps) {
    const [jobs] = useState<Job[]>(initialJobs)
    const [search, setSearch] = useState("")

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
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
                {filteredJobs.map((job, index) => (
                    <JobCard key={index} job={job} />
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
