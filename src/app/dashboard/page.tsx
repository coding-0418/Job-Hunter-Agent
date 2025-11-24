import { Briefcase, CheckCircle, XCircle, Clock } from "lucide-react"

export default function DashboardPage() {
    // Mock stats
    const stats = [
        { name: 'Jobs Found', value: '1,234', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Applied', value: '45', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
        { name: 'Interviews', value: '3', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { name: 'Rejected', value: '12', icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h2>
                <p className="text-gray-500 dark:text-gray-400">Welcome back, Candidate.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <div key={item.name} className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 rounded-md p-3 ${item.bg}`}>
                                    <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{item.name}</dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900 dark:text-white">{item.value}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recent Activity</h3>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {[1, 2, 3].map((i) => (
                        <li key={i} className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-blue-600 truncate">Applied to Senior Engineer at TechCorp</p>
                                <div className="ml-2 flex-shrink-0 flex">
                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Applied
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                        TechCorp
                                    </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                                    <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                    <p>2 hours ago</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
