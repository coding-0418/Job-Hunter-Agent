export interface Job {
    id?: string
    title: string
    company: string
    location: string
    remote: boolean
    salary?: string
    description: string
    applyUrl: string
    source: string
    externalId: string
    tags: string[]
    postedAt: Date
}

export interface JobCrawlerAdapter {
    name: string
    fetchJobs(filters?: unknown): Promise<Job[]>
}
