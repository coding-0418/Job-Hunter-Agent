import streamlit as st
from PyPDF2 import PdfReader
import requests
from serpapi.google_search import GoogleSearch
import json
import re
import os

# Load ATS Resume Structure
def load_ats_structure(is_fresher=True):
    file_path = "ats_resume_structure_fresher.json" if is_fresher else "ats_resume_structure_experienced.json"
    with open(file_path, "r") as f:
        return json.load(f)

# Extract text from uploaded resume PDF
def extract_resume_text(uploaded_file):
    if uploaded_file is not None:
        reader = PdfReader(uploaded_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text
    return ""

# Search jobs using SerpAPI
def fetch_jobs(role, location, ctc):
    search = GoogleSearch({
        "engine": "google_jobs",
        "q": role,
        "location": location,
        "api_key": st.secrets["SERPAPI_KEY"]
    })
    results = search.get_dict()
    return results.get("jobs_results", [])

# Compute match score based on JD vs resume
def compute_match_score(resume_text, jd_text):
    resume_words = set(re.findall(r'\w+', resume_text.lower()))
    jd_words = set(re.findall(r'\w+', jd_text.lower()))
    common_words = resume_words.intersection(jd_words)
    score = int((len(common_words) / len(jd_words)) * 100) if jd_words else 0
    return min(score, 100)

# Suggest improvements for resume based on JD
def suggest_resume_improvements(resume_text, jd_text):
    suggestions = []

    resume_words = set(re.findall(r'\w+', resume_text.lower()))
    jd_words = set(re.findall(r'\w+', jd_text.lower()))
    missing_skills = jd_words - resume_words
    if missing_skills:
        suggestions.append(f"🔍 Add missing keywords from JD: {', '.join(list(missing_skills)[:10])}")

    if len(resume_text) < 500:
        suggestions.append("📄 Resume content is too short. Add more detail.")

    if "education" not in resume_text.lower():
        suggestions.append("🎓 Add an education section.")

    if re.search(r'\d{4}', resume_text) is None:
        suggestions.append("📅 Add work experience with dates.")

    if len(re.findall(r'\bI\b|\bme\b', resume_text)) > 5:
        suggestions.append("❌ Avoid too much self-reference (I, me).")

    return suggestions

# Resume builder using ATS JSON template
def build_resume(template):
    st.subheader("📄 Resume Builder")
    filled_resume = {}
    for section, fields in template.items():
        st.markdown(f"### {section}")
        filled_resume[section] = {}
        for field in fields:
            filled_resume[section][field] = st.text_input(f"{section} - {field}")

    if st.button("Generate Resume JSON"):
        st.download_button("📥 Download Resume JSON", json.dumps(filled_resume, indent=2), "resume.json", "application/json")

# MAIN APP
st.set_page_config(page_title="Smart Job Agent", layout="wide")
st.title("🤖 Smart Job Hunter & Resume Enhancer")

st.sidebar.header("📌 Get Started")
has_resume = st.sidebar.radio("Do you have a resume?", ["Yes", "No"])

if has_resume == "No":
    fresher = st.sidebar.radio("Are you a Fresher?", ["Yes", "No"])
    ats_template = load_ats_structure(is_fresher=(fresher == "Yes"))
    build_resume(ats_template)
    st.stop()

# Upload Resume
uploaded_resume = st.sidebar.file_uploader("📎 Upload Resume (PDF)", type=["pdf"], key="resume_upload")
if uploaded_resume:
    resume_text = extract_resume_text(uploaded_resume)

    # Job Search Inputs
    st.sidebar.subheader("🔎 Job Preferences")
    role = st.sidebar.text_input("Job Role", "Software Engineer")
    location = st.sidebar.text_input("Location", "Bangalore")
    ctc = st.sidebar.slider("Minimum CTC (LPA)", 0, 100, 6)

    if st.sidebar.button("🚀 Start Live Job Feed"):
        with st.spinner("Fetching jobs..."):
            jobs = fetch_jobs(role, location, ctc)

        if not jobs:
            st.warning("No jobs found. Try different filters.")
        else:
            for idx, job in enumerate(jobs):
                jd = job.get("description", "")
                title = job.get("title", "N/A")
                company = job.get("company_name", "N/A")
                link = job.get("via", "")
                loc = job.get("location", "N/A")

                match = compute_match_score(resume_text, jd)
                suggestions = suggest_resume_improvements(resume_text, jd)

                st.markdown(f"### 🧠 Job {idx+1}: {title} at {company}")
                st.markdown(f"**📍 Location:** {loc}")
                st.markdown(f"**🔗 Apply via:** [{link}]({link})")
                st.markdown(f"**📊 Resume Match Score:** `{match}%`")
                st.markdown("#### 📄 Job Description")
                st.write(jd[:1000] + "..." if len(jd) > 1000 else jd)

                with st.expander("🛠 Resume Suggestions"):
                    for s in suggestions:
                        st.markdown(f"- {s}")

                st.markdown("---")
else:
    st.warning("📥 Please upload a resume to begin job matching and enhancement.")
