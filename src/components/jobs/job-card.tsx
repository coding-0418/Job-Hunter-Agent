import { Job } from "@/services/crawler/types"
import { MapPin, DollarSign, Clock, ExternalLink, ThumbsUp, ThumbsDown, Bookmark } from "lucide-react"
import { updateJobStatus } from "@/app/actions/applications"

interface JobCardProps {
    job: Job
    selected?: boolean
    onSelect?: (selected: boolean) => void
}

export default function JobCard({ job, selected = false, onSelect }: JobCardProps) {
    const handleStatusUpdate = async (status: "SELECTED" | "REJECTED" | "SAVED") => {
        await updateJobStatus(job.externalId, status)
        alert(`Job marked as ${status}`)
    }

    const getMatchColor = (score?: number) => {
        if (!score) return "bg-gray-100 text-gray-700"
        if (score >= 80) return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
        if (score >= 60) return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
        if (score >= 40) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
    }

    return (
        <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-2 transition-all ${selected ? "border-blue-500 dark:border-blue-400" : "border-gray-200 dark:border-gray-700"
            } hover:shadow-md`}>
            <div className="flex justify-between items-start gap-4">
                {onSelect && (
                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={(e) => onSelect(e.target.checked)}
                        className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                )}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                        {job.matchScore !== undefined && (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getMatchColor(job.matchScore)}`}>
                                {job.matchScore}% Match
                            </span>
                        )}
                    </div>
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
                    Posted {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : "Recently"}
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
