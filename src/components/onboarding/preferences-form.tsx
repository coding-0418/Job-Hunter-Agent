"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { savePreferences } from "@/app/actions/preferences"

export default function PreferencesForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        locations: "",
        jobTitles: "",
        remote: false,
        minSalary: "",
        skills: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await savePreferences({
                locations: formData.locations.split(",").map(s => s.trim()),
                jobTitles: formData.jobTitles.split(",").map(s => s.trim()),
                remote: formData.remote,
                minSalary: parseInt(formData.minSalary) || 0,
                skills: formData.skills.split(",").map(s => s.trim())
            })

            // Redirect to dashboard
            router.push("/dashboard")
        } catch (error) {
            console.error("Failed to save preferences", error)
            alert("Failed to save preferences")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="jobTitles" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Job Titles (comma separated)
                </label>
                <div className="mt-1">
                    <input
                        id="jobTitles"
                        name="jobTitles"
                        type="text"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Software Engineer, Frontend Developer"
                        value={formData.jobTitles}
                        onChange={(e) => setFormData({ ...formData, jobTitles: e.target.value })}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="locations" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Locations (comma separated)
                </label>
                <div className="mt-1">
                    <input
                        id="locations"
                        name="locations"
                        type="text"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="New York, San Francisco, London"
                        value={formData.locations}
                        onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                    />
                </div>
            </div>

            <div className="flex items-center">
                <input
                    id="remote"
                    name="remote"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={formData.remote}
                    onChange={(e) => setFormData({ ...formData, remote: e.target.checked })}
                />
                <label htmlFor="remote" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    I am open to remote work
                </label>
            </div>

            <div>
                <label htmlFor="minSalary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Minimum Annual Salary ($)
                </label>
                <div className="mt-1">
                    <input
                        id="minSalary"
                        name="minSalary"
                        type="number"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="100000"
                        value={formData.minSalary}
                        onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Top Skills (comma separated)
                </label>
                <div className="mt-1">
                    <textarea
                        id="skills"
                        name="skills"
                        rows={3}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="React, Node.js, Python, AWS"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Preferences"}
                </button>
            </div>
        </form>
    )
}
