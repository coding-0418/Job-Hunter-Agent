import PreferencesForm from "@/components/onboarding/preferences-form"

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                    Tell us what you&apos;re looking for
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    We&apos;ll use this to find the best jobs for you.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <PreferencesForm />
                </div>
            </div>
        </div>
    )
}
