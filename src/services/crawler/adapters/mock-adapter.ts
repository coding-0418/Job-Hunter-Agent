import { Job, JobCrawlerAdapter } from "../types"

export class MockCrawlerAdapter implements JobCrawlerAdapter {
    name = "MockAdapter"

    async fetchJobs(): Promise<Job[]> {
        return [
            {
                title: "Senior Frontend Engineer",
                company: "TechCorp",
                location: "San Francisco, CA",
                remote: true,
                salary: "$150k - $200k",
                description: "We are looking for a Senior Frontend Engineer with React experience...",
                applyUrl: "https://example.com/apply/1",
                source: "mock",
                externalId: "mock-1",
                tags: ["React", "TypeScript", "Next.js"],
                postedAt: new Date()
            },
            {
                title: "Backend Developer",
                company: "StartupInc",
                location: "New York, NY",
                remote: false,
                salary: "$120k - $160k",
                description: "Join our backend team building scalable APIs...",
                applyUrl: "https://example.com/apply/2",
                source: "mock",
                externalId: "mock-2",
                tags: ["Node.js", "PostgreSQL", "AWS"],
                postedAt: new Date()
            },
            {
                title: "Full Stack Engineer",
                company: "RemoteFirst",
                location: "Remote",
                remote: true,
                salary: "$140k - $180k",
                description: "Full stack role working with Next.js and Supabase...",
                applyUrl: "https://example.com/apply/3",
                source: "mock",
                externalId: "mock-3",
                tags: ["Next.js", "Supabase", "Tailwind"],
                postedAt: new Date()
            }
        ]
    }
}
