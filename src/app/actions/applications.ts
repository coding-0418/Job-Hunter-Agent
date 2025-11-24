"use server"

// import { createClient } from "@/lib/supabase"

export async function updateJobStatus(jobId: string, status: "SELECTED" | "REJECTED" | "SAVED") {
    console.log(`Updating job ${jobId} status to ${status}`)

    // Mock DB update
    // const supabase = createClient()
    // await supabase.from('applications').upsert({ job_id: jobId, status, user_id: auth.uid() })

    return { success: true }
}
