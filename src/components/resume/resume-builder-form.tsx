"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

interface Experience {
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
}

interface Education {
    school: string
    degree: string
    field: string
    graduationDate: string
}

interface ResumeData {
    personalInfo: {
        name: string
        email: string
        phone: string
        location: string
        linkedin?: string
        website?: string
    }
    summary: string
    experience: Experience[]
    education: Education[]
    skills: string[]
}

interface ResumeBuilderFormProps {
    initialData?: Partial<ResumeData>
    onSave: (data: ResumeData) => void
    onExport: (data: ResumeData) => void
}

export default function ResumeBuilderForm({ initialData, onSave, onExport }: ResumeBuilderFormProps) {
    const [resumeData, setResumeData] = useState<ResumeData>({
        personalInfo: initialData?.personalInfo || {
            name: "",
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            website: "",
        },
        summary: initialData?.summary || "",
        experience: initialData?.experience || [],
        education: initialData?.education || [],
        skills: initialData?.skills || [],
    })

    const [newSkill, setNewSkill] = useState("")

    const addExperience = () => {
        setResumeData({
            ...resumeData,
            experience: [
                ...resumeData.experience,
                { company: "", position: "", startDate: "", endDate: "", description: "" },
            ],
        })
    }

    const removeExperience = (index: number) => {
        setResumeData({
            ...resumeData,
            experience: resumeData.experience.filter((_, i) => i !== index),
        })
    }

    const updateExperience = (index: number, field: keyof Experience, value: string) => {
        const updated = [...resumeData.experience]
        updated[index] = { ...updated[index], [field]: value }
        setResumeData({ ...resumeData, experience: updated })
    }

    const addEducation = () => {
        setResumeData({
            ...resumeData,
            education: [...resumeData.education, { school: "", degree: "", field: "", graduationDate: "" }],
        })
    }

    const removeEducation = (index: number) => {
        setResumeData({
            ...resumeData,
            education: resumeData.education.filter((_, i) => i !== index),
        })
    }

    const updateEducation = (index: number, field: keyof Education, value: string) => {
        const updated = [...resumeData.education]
        updated[index] = { ...updated[index], [field]: value }
        setResumeData({ ...resumeData, education: updated })
    }

    const addSkill = () => {
        if (newSkill.trim()) {
            setResumeData({
                ...resumeData,
                skills: [...resumeData.skills, newSkill.trim()],
            })
            setNewSkill("")
        }
    }

    const removeSkill = (index: number) => {
        setResumeData({
            ...resumeData,
            skills: resumeData.skills.filter((_, i) => i !== index),
        })
    }

    return (
        <div className="space-y-8">
            {/* Personal Info */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={resumeData.personalInfo.name}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData,
                                personalInfo: { ...resumeData.personalInfo, name: e.target.value },
                            })
                        }
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData,
                                personalInfo: { ...resumeData.personalInfo, email: e.target.value },
                            })
                        }
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData,
                                personalInfo: { ...resumeData.personalInfo, phone: e.target.value },
                            })
                        }
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={resumeData.personalInfo.location}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData,
                                personalInfo: { ...resumeData.personalInfo, location: e.target.value },
                            })
                        }
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                        type="url"
                        placeholder="LinkedIn (optional)"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData,
                                personalInfo: { ...resumeData.personalInfo, linkedin: e.target.value },
                            })
                        }
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                        type="url"
                        placeholder="Website (optional)"
                        value={resumeData.personalInfo.website}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData,
                                personalInfo: { ...resumeData.personalInfo, website: e.target.value },
                            })
                        }
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>
            </div>

            {/* Summary */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Professional Summary</h3>
                <textarea
                    placeholder="Brief overview of your professional background and key achievements..."
                    value={resumeData.summary}
                    onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
            </div>

            {/* Experience */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Work Experience</h3>
                    <button
                        onClick={addExperience}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                        <Plus className="w-4 h-4" /> Add
                    </button>
                </div>
                <div className="space-y-4">
                    {resumeData.experience.map((exp, index) => (
                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg space-y-3">
                            <div className="flex justify-between">
                                <h4 className="font-medium text-gray-900 dark:text-white">Experience #{index + 1}</h4>
                                <button onClick={() => removeExperience(index)} className="text-red-500 hover:text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="Company"
                                    value={exp.company}
                                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Position"
                                    value={exp.position}
                                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                />
                                <input
                                    type="month"
                                    placeholder="Start Date"
                                    value={exp.startDate}
                                    onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                />
                                <input
                                    type="month"
                                    placeholder="End Date"
                                    value={exp.endDate}
                                    onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                />
                            </div>
                            <textarea
                                placeholder="Key responsibilities and achievements..."
                                value={exp.description}
                                onChange={(e) => updateExperience(index, "description", e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Education */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Education</h3>
                    <button
                        onClick={addEducation}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                        <Plus className="w-4 h-4" /> Add
                    </button>
                </div>
                <div className="space-y-4">
                    {resumeData.education.map((edu, index) => (
                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg space-y-3">
                            <div className="flex justify-between">
                                <h4 className="font-medium text-gray-900 dark:text-white">Education #{index + 1}</h4>
                                <button onClick={() => removeEducation(index)} className="text-red-500 hover:text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="School/University"
                                    value={edu.school}
                                    onChange={(e) => updateEducation(index, "school", e.target.value)}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Field of Study"
                                    value={edu.field}
                                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                />
                                <input
                                    type="month"
                                    placeholder="Graduation Date"
                                    value={edu.graduationDate}
                                    onChange={(e) => updateEducation(index, "graduationDate", e.target.value)}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills</h3>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addSkill()}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <button
                        onClick={addSkill}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm flex items-center gap-2"
                        >
                            {skill}
                            <button onClick={() => removeSkill(index)} className="hover:text-blue-900 dark:hover:text-blue-100">
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={() => onSave(resumeData)}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                >
                    Save Resume
                </button>
                <button
                    onClick={() => onExport(resumeData)}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                >
                    Export as PDF
                </button>
            </div>
        </div>
    )
}
