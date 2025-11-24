"use server"

import { JobCrawlerService } from "@/services/crawler/crawler"

export async function fetchJobs() {
    const crawler = new JobCrawlerService()
    const result = await crawler.runCrawler()
    return result.jobs
}
