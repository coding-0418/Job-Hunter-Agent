import { Job } from "@/services/crawler/types"
import { MapPin, DollarSign, Clock, ExternalLink, ThumbsUp, ThumbsDown, Bookmark } from "lucide-react"
import { updateJobStatus } from "@/app/actions/applications"

interface JobCardProps {
    job: Job
}

export default function JobCard({ job }: JobCardProps) {
    const handleStatusUpdate = async (status: "SELECTED" | "REJECTED" | "SAVED") => {
        await updateJobStatus(job.externalId, status)
        alert(`Job marked as ${status}`)
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{job.company}</p>
                </div>
                <div className="flex space-x-2">
                    <button onClick={() => handleStatusUpdate("SELECTED")} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full transition-colors" title="Select to Apply">
                        <ThumbsUp className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleStatusUpdate("REJECTED")} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors" title="Reject">
                        <ThumbsDown className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleStatusUpdate("SAVED")} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors" title="Save">
                        <Bookmark className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location} {job.remote && "(Remote)"}
                </div>
                {job.salary && (
                    <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {job.salary}
                    </div>
                )}
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Posted {new Date(job.postedAt).toLocaleDateString()}
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <p className="text-sm text-gray-500 line-clamp-2 max-w-2xl">
                    {job.description}
                </p>
                <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                    View Details <ExternalLink className="w-4 h-4 ml-1" />
                </a>
            </div>
        </div>
    )
}
