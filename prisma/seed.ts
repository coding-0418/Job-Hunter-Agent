import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Create a mock user
    const user = await prisma.user.upsert({
        where: { email: 'demo@example.com' },
        update: {},
        create: {
            email: 'demo@example.com',
            role: 'CANDIDATE',
        }
    })

    console.log({ user })

    // Create some mock jobs
    const job1 = await prisma.job.upsert({
        where: { externalId: 'seed-1' },
        update: {},
        create: {
            title: 'Senior React Developer',
            company: 'Tech Giants Inc',
            location: 'Remote',
            remote: true,
            salary: '$160k - $200k',
            description: 'We need a React expert...',
            applyUrl: 'https://example.com/apply/seed-1',
            source: 'seed',
            externalId: 'seed-1',
            tags: JSON.stringify(['React', 'TypeScript'])
        }
    })

    console.log({ job1 })

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
