import streamlit as st
import requests
from PyPDF2 import PdfReader
import re

st.set_page_config(page_title="Google Jobs Hunter", layout="wide")
st.title("🔍 Google Jobs AI Agent")

# Sidebar: Resume Upload & Filters
st.sidebar.header("📄 Upload Resume")
uploaded_resume = st.sidebar.file_uploader("Upload your resume (PDF only)", type=["pdf"], key="resume_uploader")

serpapi_key = st.sidebar.text_input("🔑 Enter your SerpAPI Key", type="password")

st.sidebar.header("🎯 Job Search Filters")
role = st.sidebar.text_input("Target Role", value="Product Manager")
location = st.sidebar.text_input("Location", value="Hyderabad, India")
num_jobs = st.sidebar.slider("🔎 Number of jobs", min_value=1, max_value=20, value=10)

# PDF Text Extraction
def extract_text_from_pdf(uploaded_file):
    reader = PdfReader(uploaded_file)
    return " ".join([page.extract_text() for page in reader.pages if page.extract_text()]).lower()

# Get jobs from SerpAPI
def fetch_jobs(query, location, api_key, num=10):
    url = "https://serpapi.com/search"
    params = {
        "engine": "google_jobs",
        "q": query,
        "location": location,
        "hl": "en",
        "api_key": api_key
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data.get("jobs_results", [])[:num]

# Match Score Calculation
def calculate_match_score(resume_text, job_desc):
    resume_words = set(re.findall(r'\b\w+\b', resume_text))
    jd_words = set(re.findall(r'\b\w+\b', job_desc.lower()))
    common = resume_words.intersection(jd_words)
    return round(len(common) / len(jd_words) * 100, 2) if jd_words else 0

# Resume Suggestions (deep analysis)
def generate_resume_suggestions(resume_text, job_desc):
    resume_words = set(re.findall(r'\b\w+\b', resume_text))
    jd_words = set(re.findall(r'\b\w+\b', job_desc.lower()))
    missing = jd_words - resume_words
    keywords = [w for w in missing if len(w) > 4 and w.isalpha()]

    suggestions = []
    if keywords:
        suggestions.append("🔍 **Missing Keywords/Skills:**")
        for kw in list(keywords)[:8]:
            suggestions.append(f"• Consider adding relevant details about `{kw}`.")

    if "education" not in resume_text:
        suggestions.append("🎓 Consider explicitly listing your education details.")

    if len(resume_text.split()) < 200:
        suggestions.append("📝 Your resume content seems short. Add more descriptions under projects or experiences.")

    if not re.search(r'@\w+\.\w+', resume_text):
        suggestions.append("📧 No email detected. Add contact information clearly.")

    if not re.search(r'\d{10}', resume_text):
        suggestions.append("📞 Add a phone number to make it easy for recruiters to reach you.")

    suggestions.append("✅ Use consistent formatting: avoid too many fonts/sizes/colors.")
    suggestions.append("🗑️ Avoid listing outdated tools or irrelevant skills.")

    return suggestions if suggestions else ["✅ Your resume aligns well with this job!"]

# Action: Find Jobs
if st.sidebar.button("🚀 Find Jobs"):
    if not uploaded_resume or not serpapi_key:
        st.warning("Please upload your resume and enter your SerpAPI key.")
    else:
        with st.spinner("🔍 Fetching jobs..."):
            resume_text = extract_text_from_pdf(uploaded_resume)
            jobs = fetch_jobs(role, location, serpapi_key, num=num_jobs)

            if not jobs:
                st.error("❌ No jobs found. Try a different role or location.")
            else:
                st.success(f"✅ Found {len(jobs)} jobs!")

                for job in jobs:
                    title = job.get("title", "N/A")
                    company = job.get("company_name", "N/A")
                    loc = job.get("location", "N/A")
                    apply_link = job.get("job_apply_link", job.get("via", "#"))
                    jd = job.get("description", "")

                    match_score = calculate_match_score(resume_text, jd)
                    suggestions = generate_resume_suggestions(resume_text, jd)

                    # Job Info Block
                    st.markdown(f"""
                        <div style="border:1px solid #444; border-radius:8px; padding:15px; margin-bottom:20px; background-color:#111;">
                            <h4 style="color:#f1f1f1;">📌 {title}</h4>
                            <p style="color:#bbb;">🏢 <b>{company}</b> | 📍 {loc}</p>
                            <p style="color:#ccc;"><b>Match Score:</b> {match_score}%</p>
                            <p><a href="{apply_link}" target="_blank">🔗 Apply Now</a></p>
                        </div>
                    """, unsafe_allow_html=True)

                    with st.expander("📄 Full Job Description"):
                        st.markdown(jd)

                    with st.expander("🛠️ Resume Suggestions"):
                        for tip in suggestions:
                            st.write(tip)
