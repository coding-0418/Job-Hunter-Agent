import JobList from "@/components/jobs/job-list"
import { fetchJobs } from "@/app/actions/jobs"
import { getUserResume } from "@/app/actions/check-resume"
import { JobMatcher } from "@/services/job-matcher"

export default async function JobsPage() {
    const jobs = await fetchJobs()
    const { resume } = await getUserResume()

    // Calculate match scores if resume exists
    let jobsWithScores = jobs
    if (resume) {
        const matcher = new JobMatcher()
        jobsWithScores = jobs.map(job => ({
            ...job,
            matchScore: matcher.calculateMatchScore(resume, job)
        }))
        // Sort by match score descending
        jobsWithScores.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Jobs</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        {resume ? `Found ${jobs.length} jobs matching your profile` : "Find and apply to your next role"}
                    </p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Run Crawler
                </button>
            </div>

            <JobList initialJobs={jobsWithScores} hasResume={!!resume} />
        </div>
    )
}
