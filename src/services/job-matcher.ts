interface ResumeData {
    skills?: string[]
    experience?: Array<{
        position?: string
        description?: string
    }>
    summary?: string
    textContent?: string
}

interface Job {
    title: string
    description: string
    tags: string[]
}

export class JobMatcher {
    /**
     * Calculate match score between resume and job description
     * Returns a score from 0-100
     */
    calculateMatchScore(resume: ResumeData, job: Job): number {
        let totalScore = 0
        let maxScore = 0

        // 1. Skills Match (40% weight)
        const skillsScore = this.calculateSkillsMatch(resume.skills || [], job.tags)
        totalScore += skillsScore * 0.4
        maxScore += 100 * 0.4

        // 2. Title/Experience Match (30% weight)
        const titleScore = this.calculateTitleMatch(resume, job.title)
        totalScore += titleScore * 0.3
        maxScore += 100 * 0.3

        // 3. Description Keywords Match (30% weight)
        const descriptionScore = this.calculateDescriptionMatch(resume, job.description)
        totalScore += descriptionScore * 0.3
        maxScore += 100 * 0.3

        return Math.round((totalScore / maxScore) * 100)
    }

    private calculateSkillsMatch(resumeSkills: string[], jobTags: string[]): number {
        if (resumeSkills.length === 0 || jobTags.length === 0) return 0

        const normalizedResumeSkills = resumeSkills.map(s => s.toLowerCase().trim())
        const normalizedJobTags = jobTags.map(t => t.toLowerCase().trim())

        let matches = 0
        normalizedJobTags.forEach(tag => {
            if (normalizedResumeSkills.some(skill =>
                skill.includes(tag) || tag.includes(skill)
            )) {
                matches++
            }
        })

        return (matches / normalizedJobTags.length) * 100
    }

    private calculateTitleMatch(resume: ResumeData, jobTitle: string): number {
        const normalizedJobTitle = jobTitle.toLowerCase()
        let score = 0

        // Check experience positions
        if (resume.experience) {
            const positions = resume.experience
                .map(exp => exp.position?.toLowerCase() || "")
                .filter(Boolean)

            positions.forEach(position => {
                // Exact match
                if (position === normalizedJobTitle) {
                    score = Math.max(score, 100)
                }
                // Partial match
                else if (position.includes(normalizedJobTitle) || normalizedJobTitle.includes(position)) {
                    score = Math.max(score, 70)
                }
                // Keywords match
                else {
                    const positionWords = position.split(/\s+/)
                    const titleWords = normalizedJobTitle.split(/\s+/)
                    const commonWords = positionWords.filter(w => titleWords.includes(w) && w.length > 3)
                    if (commonWords.length > 0) {
                        score = Math.max(score, (commonWords.length / titleWords.length) * 50)
                    }
                }
            })
        }

        return score
    }

    private calculateDescriptionMatch(resume: ResumeData, jobDescription: string): number {
        // Extract keywords from job description (simple approach)
        const jobKeywords = this.extractKeywords(jobDescription)

        // Build resume text
        let resumeText = ""
        if (resume.summary) resumeText += resume.summary + " "
        if (resume.textContent) resumeText += resume.textContent + " "
        if (resume.experience) {
            resume.experience.forEach(exp => {
                if (exp.description) resumeText += exp.description + " "
            })
        }

        const resumeKeywords = this.extractKeywords(resumeText)

        if (jobKeywords.length === 0) return 50 // Default score if no keywords

        let matches = 0
        jobKeywords.forEach(keyword => {
            if (resumeKeywords.includes(keyword)) {
                matches++
            }
        })

        return (matches / jobKeywords.length) * 100
    }

    private extractKeywords(text: string): string[] {
        // Simple keyword extraction - remove common words and extract meaningful terms
        const commonWords = new Set([
            "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
            "of", "with", "by", "from", "as", "is", "was", "are", "were", "be",
            "been", "being", "have", "has", "had", "do", "does", "did", "will",
            "would", "should", "could", "may", "might", "must", "can", "this",
            "that", "these", "those", "i", "you", "he", "she", "it", "we", "they"
        ])

        return text
            .toLowerCase()
            .replace(/[^\w\s]/g, " ")
            .split(/\s+/)
            .filter(word => word.length > 3 && !commonWords.has(word))
            .filter((word, index, self) => self.indexOf(word) === index) // unique
            .slice(0, 50) // limit to top 50 keywords
    }
}
