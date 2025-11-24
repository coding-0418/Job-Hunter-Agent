"use server"

import { AutoApplyAgent } from "@/services/auto-apply/agent"

export async function runAutoApply(jobIds: string[]) {
    const agent = new AutoApplyAgent()
    const results = []

    // In real app, fetch resume data from DB
    const mockResume = { name: "John Doe", email: "john@example.com" }

    for (const id of jobIds) {
        const result = await agent.applyToJob(id, mockResume)
        results.push(result)
        // Update DB with result
    }

    return results
}
