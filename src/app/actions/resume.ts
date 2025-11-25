"use server"

import { parseResume } from "@/services/resume-parser"
// import { createClient } from "@/lib/supabase" // This will be the server client
// We need a server-side supabase client helper, let's assume we'll create it or use the one we have if it supports server
// Actually, for server actions we need cookie handling.
// For now, we'll just mock the DB part if credentials are missing or just return the parsed data.

export async function uploadAndParseResume(formData: FormData) {
    try {
        const file = formData.get("file") as File

        if (!file) {
            return { error: "No file provided" }
        }

        if (file.type !== "application/pdf") {
            return { error: "Only PDF files are supported" }
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Parse resume
        const parsedData = await parseResume(buffer)

        // TODO: Save to database
        // For now, just return the parsed data
        return {
            data: parsedData,
            success: true,
        }
    } catch (error) {
        console.error("Error in uploadAndParseResume:", error)
        return { error: "Failed to process resume" }
    }
}
