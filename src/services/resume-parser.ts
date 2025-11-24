/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const pdf = require("pdf-parse");

export interface ParsedResume {
    text: string
    email?: string
    phone?: string
    name?: string
    links?: string[]
}

export async function parseResumePdf(buffer: Buffer): Promise<ParsedResume> {
    try {
        const data = await pdf(buffer)
        const text = data.text

        // Basic extraction heuristics
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
        const phoneRegex = /(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g
        const urlRegex = /(https?:\/\/[^\s]+)/g

        const emails = text.match(emailRegex) || []
        const phones = text.match(phoneRegex) || []
        const links = text.match(urlRegex) || []

        // Simple name heuristic: First line or lines that look like a name
        // This is very naive, a real system would use NLP or LLM
        const lines = text.split('\n').filter((line: string) => line.trim().length > 0)
        const name = lines.length > 0 ? lines[0].trim() : undefined

        return {
            text,
            email: emails[0],
            phone: phones[0],
            name,
            links: Array.from(new Set(links))
        }
    } catch (error) {
        console.error("Error parsing PDF:", error)
        throw new Error("Failed to parse PDF")
    }
}
