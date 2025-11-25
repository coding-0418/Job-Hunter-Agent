# API Reference

The Jobify uses Next.js Server Actions for backend logic.

## Server Actions

### Resume

- `uploadAndParseResume(formData: FormData)`: Uploads a PDF resume and extracts text/fields. Returns parsed data.

### Jobs

- `fetchJobs()`: Triggers the crawler service to fetch jobs based on active adapters. Returns a list of jobs.

### Applications

- `updateJobStatus(jobId: string, status: string)`: Updates the status of a job (SELECTED, REJECTED, SAVED).

### Auto-Apply

- `runAutoApply(jobIds: string[])`: Triggers the auto-apply agent for the selected jobs. Returns application results.

### Preferences

- `savePreferences(data: PreferencesData)`: Saves user job preferences.
