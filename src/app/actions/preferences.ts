"use server"

// import { createClient } from "@/lib/supabase"

interface PreferencesData {
    locations: string[]
    jobTitles: string[]
    remote: boolean
    minSalary: number
    skills: string[]
}

export async function savePreferences(data: PreferencesData) {
    // Mock saving to DB
    console.log("Saving preferences:", data)

    // In real app:
    // const supabase = createClient()
    // await supabase.from('job_preferences').upsert({ ...data, user_id: auth.uid() })

    return { success: true }
}
