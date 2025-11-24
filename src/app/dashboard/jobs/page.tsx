import JobList from "@/components/jobs/job-list"
import { fetchJobs } from "@/app/actions/jobs"

export default async function JobsPage() {
    const jobs = await fetchJobs()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Jobs</h2>
                    <p className="text-gray-500 dark:text-gray-400">Find and apply to your next role.</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Run Crawler
                </button>
            </div>

            <JobList initialJobs={jobs} />
        </div>
    )
}
