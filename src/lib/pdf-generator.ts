import jsPDF from "jspdf"

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
    experience: Array<{
        company: string
        position: string
        startDate: string
        endDate: string
        description: string
    }>
    education: Array<{
        school: string
        degree: string
        field: string
        graduationDate: string
    }>
    skills: string[]
}

export function generateResumePDF(data: ResumeData): void {
    const doc = new jsPDF()
    let yPosition = 20

    // Helper to add text with line breaks
    const addText = (text: string, x: number, size: number = 10, isBold: boolean = false) => {
        doc.setFontSize(size)
        if (isBold) {
            doc.setFont("helvetica", "bold")
        } else {
            doc.setFont("helvetica", "normal")
        }
        doc.text(text, x, yPosition)
        yPosition += size * 0.5
    }

    // Header - Name and Contact
    addText(data.personalInfo.name, 20, 18, true)
    yPosition += 2
    addText(`${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`, 20, 10)
    if (data.personalInfo.linkedin || data.personalInfo.website) {
        const links = [data.personalInfo.linkedin, data.personalInfo.website].filter(Boolean).join(" | ")
        addText(links, 20, 9)
    }
    yPosition += 5

    // Summary
    if (data.summary) {
        addText("PROFESSIONAL SUMMARY", 20, 12, true)
        yPosition += 2
        const summaryLines = doc.splitTextToSize(data.summary, 170)
        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text(summaryLines, 20, yPosition)
        yPosition += summaryLines.length * 5 + 5
    }

    // Experience
    if (data.experience.length > 0) {
        addText("WORK EXPERIENCE", 20, 12, true)
        yPosition += 2

        data.experience.forEach((exp) => {
            if (yPosition > 270) {
                doc.addPage()
                yPosition = 20
            }

            addText(`${exp.position} at ${exp.company}`, 20, 11, true)
            addText(`${exp.startDate} - ${exp.endDate}`, 20, 9)
            yPosition += 1

            const descLines = doc.splitTextToSize(exp.description, 170)
            doc.setFontSize(10)
            doc.setFont("helvetica", "normal")
            doc.text(descLines, 20, yPosition)
            yPosition += descLines.length * 5 + 3
        })
        yPosition += 2
    }

    // Education
    if (data.education.length > 0) {
        if (yPosition > 250) {
            doc.addPage()
            yPosition = 20
        }

        addText("EDUCATION", 20, 12, true)
        yPosition += 2

        data.education.forEach((edu) => {
            addText(`${edu.degree} in ${edu.field}`, 20, 11, true)
            addText(`${edu.school} - ${edu.graduationDate}`, 20, 9)
            yPosition += 3
        })
        yPosition += 2
    }

    // Skills
    if (data.skills.length > 0) {
        if (yPosition > 260) {
            doc.addPage()
            yPosition = 20
        }

        addText("SKILLS", 20, 12, true)
        yPosition += 2
        const skillsText = data.skills.join(", ")
        const skillLines = doc.splitTextToSize(skillsText, 170)
        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text(skillLines, 20, yPosition)
    }

    // Download
    doc.save(`${data.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`)
}
