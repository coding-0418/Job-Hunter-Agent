import { Job, JobCrawlerAdapter } from "./types"
import { MockCrawlerAdapter } from "./adapters/mock-adapter"

export class JobCrawlerService {
    private adapters: JobCrawlerAdapter[] = []

    constructor() {
        // Register adapters
        this.adapters.push(new MockCrawlerAdapter())
        // Add more adapters here (e.g. LinkedIn, Indeed via API)
    }

    async runCrawler(): Promise<{ jobs: Job[], count: number }> {
        let allJobs: Job[] = []

        for (const adapter of this.adapters) {
            try {
                console.log(`Running crawler adapter: ${adapter.name}`)
                const jobs = await adapter.fetchJobs()
                allJobs = [...allJobs, ...jobs]
            } catch (error) {
                console.error(`Error in adapter ${adapter.name}:`, error)
            }
        }

        // TODO: Deduplicate and save to DB
        console.log(`Found ${allJobs.length} jobs total`)

        return {
            jobs: allJobs,
            count: allJobs.length
        }
    }
}
