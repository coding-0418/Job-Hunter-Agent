"use server"

import { createClient } from "@/lib/supabase-server"

export async function checkUserHasResume() {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return { hasResume: false, error: "Not authenticated" }
        }

        // TODO: Check database for user's resume
        // For now, return mock data
        // const { data: resumes } = await supabase
        //   .from('resumes')
        //   .select('id')
        //   .eq('user_id', user.id)
        //   .limit(1)

        // Mock: assume user has resume if they've been through onboarding
        return { hasResume: true, userId: user.id }
    } catch (error) {
        console.error("Error checking resume:", error)
        return { hasResume: false, error: "Failed to check resume" }
    }
}

export async function getUserResume() {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return { resume: null, error: "Not authenticated" }
        }

        // TODO: Fetch actual resume from database
        // For now, return mock data
        return {
            resume: {
                skills: ["JavaScript", "TypeScript", "React", "Node.js"],
                experience: [
                    {
                        position: "Software Engineer",
                        description: "Built web applications using React and Node.js"
                    }
                ],
                summary: "Experienced software engineer",
                textContent: "Software engineer with 5 years of experience"
            }
        }
    } catch (error) {
        console.error("Error fetching resume:", error)
        return { resume: null, error: "Failed to fetch resume" }
    }
}
