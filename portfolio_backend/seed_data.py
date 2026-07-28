"""
Data seed script â€” populates the Django database with all
the hardcoded portfolio content from the original React components.

Run with:
    python manage.py shell < seed_data.py
  OR:
    python seed_data.py  (from portfolio_backend/ directory)
"""

import os
import sys
import django

# Setup Django
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

from portfolio.models import (
    Profile, SocialLink, Project, ProjectBullet,
    CareerEntry, Achievement, AboutSkill, ExpertiseArea,
    TechCategory, Tech, Stat,
)

# Prevent duplicate seeding
import sys
if Profile.objects.exists():
    print("Database already seeded. Skipping.")
    sys.exit(0)

print("🌱 Seeding database...")

# ————————————————————————————————————————————————————————————————————————
Profile.objects.all().delete()
SocialLink.objects.all().delete()
Project.objects.all().delete()
CareerEntry.objects.all().delete()
AboutSkill.objects.all().delete()
ExpertiseArea.objects.all().delete()
TechCategory.objects.all().delete()
Stat.objects.all().delete()
print("  âœ“ Cleared existing data")

# â”€â”€â”€ Profile â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Profile.objects.create(
    name="Nahidul Arafat",
    first_name="NAHIDUL",
    last_name="ARAFAT",
    tagline="A Passionate",
    role_line1="FULL STACK",
    role_line2="ENGINEER",
    email="nahidularaf@gmail.com",
    phone="+880 1974-337424",
    github_url="https://github.com/nahidularafat",
    linkedin_url="https://www.linkedin.com/in/nahidul-arafat-9ab8332ba",
    resume_url="/resume.pdf",
    copyright_year="2025",
)
print("  âœ“ Profile created")

# â”€â”€â”€ Social Links â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
social_data = [
    ("github",   "Github",   "https://github.com/nahidularafat",                        "FaGithub",     0),
    ("linkedin", "LinkedIn", "https://www.linkedin.com/in/nahidul-arafat-9ab8332ba",    "FaLinkedinIn", 1),
    ("codeforces","Codeforces","https://codeforces.com/profile/Arafat0012",             "FaCode",       2),
    ("codechef", "CodeChef", "https://www.codechef.com/users/nahidularaf",              "FaCode",       3),
]
for platform, label, url, icon, order in social_data:
    SocialLink.objects.create(
        platform=platform, label=label, url=url, icon_name=icon,
        order=order, is_active=(order < 2),  # Only GitHub & LinkedIn active by default
    )
print("  âœ“ Social links created")

# â”€â”€â”€ Projects â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
projects_data = [
    {
        "number": "01",
        "title": "Ondrobit â€” Company Website",
        "category": "Corporate Website",
        "tools": "Django, Python, Bootstrap",
        "link": "https://ondrobit.com/",
        "order": 0,
        "bullets": [
            "Designed and developed the main corporate website for Ondrobit, showcasing the company, its live-commerce platform, and contact channels.",
            "Ensured a responsive, brand-forward design.",
        ],
    },
    {
        "number": "02",
        "title": "Ondrobit Shop",
        "category": "E-commerce Platform",
        "tools": "Django, Python, Bootstrap, SQLite/MySQL",
        "link": "https://shop.ondrobit.com/",
        "order": 1,
        "bullets": [
            "Developed a full-featured e-commerce platform with a mobile-first UI.",
            "Built advanced product pages with multi-image galleries, zoom, and dynamic specifications.",
            "Implemented smart cart, checkout, COD, and online payments.",
            "Customized Django Admin dashboard using inlines to efficiently manage products and inventory.",
            "Built an automated fraud detection engine using Steadfast API and blacklists.",
        ],
    },
    {
        "number": "03",
        "title": "BrainSpace AI",
        "category": "Mental Health Conversational Agent",
        "tools": "LangChain, LangGraph, PyTorch, Gemini API, Django",
        "link": "https://github.com/nahidularafat/AI-Mental-Health-Agent-Clinical-Assessment-Tool",
        "order": 2,
        "bullets": [
            "Engineered an intelligent ReAct-based conversational agent using LangGraph and Gemini API.",
            "Built a custom deep learning inference layer using PyTorch to analyze clinical patterns and predict stress levels.",
            "Architected a microservices backend combining Django for core functionalities and REST API for low-latency inference.",
            "Integrated Twilio API for emergency alerts upon detection of high-risk user sentiment.",
        ],
    },
    {
        "number": "04",
        "title": "BUBT Bus Tracker",
        "category": "Cross-Platform Mobile App",
        "tools": "Flutter, Dart, Firebase, Google Maps API",
        "link": "https://github.com/nahidularafat/BUBT_BUS_TRACKER-",
        "order": 3,
        "bullets": [
            "Developed a cross-platform bus tracking application using Flutter.",
            "Integrated Google Maps API for live bus locations and map-based tracking.",
            "Implemented Firebase Auth and Firestore for real-time data synchronization.",
            "Built real-time bus status updates with dynamic UI rendering.",
        ],
    },
]

for p in projects_data:
    bullets = p.pop("bullets")
    project = Project.objects.create(**p, image_static_path="/images/placeholder.webp")
    for i, text in enumerate(bullets):
        ProjectBullet.objects.create(project=project, text=text, order=i)

print("  âœ“ Projects & bullets created")

# â”€â”€â”€ Career Entries â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
job = CareerEntry.objects.create(
    entry_type='job',
    title='Software Developer',
    organization='Ondrobit (Remote) â€” ondrobit.com',
    org_url='https://ondrobit.com/',
    period='Present',
    description=(
        "Developing and maintaining RESTful backend APIs using Django and Python for a live e-commerce platform. "
        "Contributing to database schema design and integration, improving query efficiency for product and order management modules. "
        "Collaborating with a remote team to ship maintainable, scalable features on a regular release cycle."
    ),
    order=0,
)

edu = CareerEntry.objects.create(
    entry_type='education',
    title='B.Sc. in Computer Science & Engineering',
    organization='Bangladesh University of Business & Technology (BUBT)',
    period='2022-2026',
    description=(
        "Computer Science graduate. Gained comprehensive knowledge in OOP, "
        "Data Structures & Algorithms, and modern web development architectures."
    ),
    order=1,
)

ach_entry = CareerEntry.objects.create(
    entry_type='achievements',
    title='Achievements & Competitions',
    organization='Hackathons & Olympiads',
    period='',
    order=2,
)

achievements = [
    ("Top 10 of 300+ Teams Nationwide, Eco Leaders Training Program",
     "organized by The Earth Society, funded by the British High Commission"),
    ("Champion, Climate Smart Business Transformation Category",
     "Youth-Led Sustainability Action Research 2026 Pitch Day, an initiative by ActionAid Bangladesh & SustainLaunch Labs"),
    ("2nd Runners-Up, Impact Launch Night 2026",
     "organized by SustainLaunch Labs"),
    ("Champion, Engineering Olympiad 2025",
     "Bangladesh University of Business & Technology (BUBT)"),
    ("Top 20 Finalist, Green Innovation 2025",
     "an initiative by ActionAid Bangladesh"),
    ("Finalist, InnovateX Hackathon 2025",
     "organized by Programming Hero"),
    ("Qualified, Innovation World Cup 2026 (Indonesia)", ""),
    ("Round 3 Qualifier, Hult Prize 2026", ""),
    ("3Ã— ICPC Contest Participant; 3Ã— Qualifier, BUBT Intra-University Programming Contest (BIUPC)", ""),
    ("Solved 500+ programming problems",
     "across Codeforces, CodeChef, and VJudge"),
]
for i, (highlight, desc) in enumerate(achievements):
    Achievement.objects.create(career_entry=ach_entry, highlight=highlight, description=desc, order=i)

print("  âœ“ Career entries & achievements created")

# â”€â”€â”€ About Skills â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
about_skills_data = [
    ("Full-Stack Engineering",
     "Specializing in Python, Django, FastAPI, and React. Experienced in building scalable microservices and comprehensive web platforms from scratch.",
     0),
    ("AI & Machine Learning",
     "Proficient in integrating LLMs (LangChain, Gemini API) and architecting computer vision pipelines using PyTorch for intelligent, automated products.",
     1),
    ("Algorithms & Problem Solving",
     "Strong foundation in data structures and algorithms with 500+ programming problems solved across Codeforces, CodeChef, and VJudge.",
     2),
]
for title, desc, order in about_skills_data:
    AboutSkill.objects.create(title=title, description=desc, order=order)

print("  âœ“ About skills created")

# â”€â”€â”€ Expertise Areas (What I Do) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
expertise_data = [
    {
        "title": "FRONTEND",
        "subtitle": "Interface",
        "description": "Crafting responsive, mobile-first user interfaces with HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, and React.js â€” turning designs into fast, polished experiences across devices.",
        "tags": "React.js, JavaScript, Tailwind CSS, Bootstrap, HTML / CSS",
        "order": 0,
    },
    {
        "title": "BACKEND",
        "subtitle": "Engineering",
        "description": "Building robust, scalable REST APIs and full-stack web applications with Python, Django, and FastAPI â€” from architecture to deployment on Linux/cPanel environments.",
        "tags": "Python, Django, FastAPI, REST API, MySQL, SQLite, Firebase, Git",
        "order": 1,
    },
    {
        "title": "AI / ML",
        "subtitle": "Intelligence",
        "description": "Designing LLM-powered agents, computer vision pipelines, and deep learning models â€” bridging research-grade ideas to production-ready systems using modern AI stacks.",
        "tags": "LangChain, LangGraph, PyTorch, YOLOv8, Scikit-learn, Pandas, NumPy, Gemini API, Ollama",
        "order": 2,
    },
]
for e in expertise_data:
    ExpertiseArea.objects.create(**e)

print("  âœ“ Expertise areas created")

# â”€â”€â”€ Tech Categories & Techs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
tech_data = [
    {
        "title": "Backend & APIs",
        "order": 0,
        "techs": [
            ("Django", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", "#22C55E"),
            ("Django REST Framework", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", "#22C55E"),
            ("FastAPI", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", "#22C55E"),
            ("Python", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", "#3B82F6"),
        ],
    },
    {
        "title": "Frontend & Data Apps",
        "order": 1,
        "techs": [
            ("React", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", "#38BDF8"),
            ("Streamlit", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", "#EF4444"),
            ("JavaScript", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", "#F59E0B"),
            ("HTML5", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", "#F97316"),
            ("CSS3", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", "#38BDF8"),
            ("Bootstrap", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", "#7C3AED"),
        ],
    },
    {
        "title": "IoT & Embedded Systems",
        "order": 2,
        "techs": [
            ("Arduino", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg", "#38BDF8"),
            ("Raspberry Pi", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg", "#EF4444"),
            ("IoT", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", "#A855F7"),
        ],
    },
    {
        "title": "Languages",
        "order": 3,
        "techs": [
            ("Java", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", "#EC4899"),
            ("C++", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", "#A855F7"),
            ("C#", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", "#8B5CF6"),
            ("C", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", "#8B5CF6"),
            ("Dart", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", "#38BDF8"),
        ],
    },
    {
        "title": "Mobile & Desktop",
        "order": 4,
        "techs": [
            ("Flutter", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", "#38BDF8"),
            (".NET", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg", "#8B5CF6"),
            ("JavaFX", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", "#EC4899"),
        ],
    },
    {
        "title": "AI / ML & Data",
        "order": 5,
        "techs": [
            ("TensorFlow", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", "#F97316"),
            ("Pandas", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", "#8B5CF6"),
            ("NumPy", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", "#38BDF8"),
            ("Matplotlib", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", "#3B82F6"),
        ],
    },
    {
        "title": "Databases & Tools",
        "order": 6,
        "techs": [
            ("MySQL", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", "#38BDF8"),
            ("PostgreSQL", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", "#38BDF8"),
            ("SQLite", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", "#38BDF8"),
            ("Firebase", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", "#F59E0B"),
            ("Git", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", "#F97316"),
            ("Docker", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", "#38BDF8"),
            ("Visual Studio Code", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", "#38BDF8"),
        ],
    },
]

for cat_data in tech_data:
    techs = cat_data.pop("techs")
    cat = TechCategory.objects.create(**cat_data)
    for i, (name, icon_url, color) in enumerate(techs):
        Tech.objects.create(category=cat, name=name, icon_url=icon_url, color=color, order=i)

print("  âœ“ Tech categories & techs created")

# â”€â”€â”€ Stats â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
from portfolio.models import Tech as TechModel
total_techs = TechModel.objects.count()

stats_data = [
    (f"{total_techs}+", "Technologies", 0),
    ("500+", "Problems Solved", 1),
    ("10+", "Projects Built", 2),
]
for value, label, order in stats_data:
    Stat.objects.create(value=value, label=label, order=order)

print("  âœ“ Stats created")

print("\nâœ… Seeding complete! Summary:")
print(f"   Profile:         {Profile.objects.count()}")
print(f"   Social Links:    {SocialLink.objects.count()}")
print(f"   Projects:        {Project.objects.count()}")
print(f"   Career Entries:  {CareerEntry.objects.count()}")
print(f"   About Skills:    {AboutSkill.objects.count()}")
print(f"   Expertise Areas: {ExpertiseArea.objects.count()}")
print(f"   Tech Categories: {TechCategory.objects.count()}")
print(f"   Technologies:    {TechModel.objects.count()}")
print(f"   Stats:           {Stat.objects.count()}")
print("\nðŸš€ Start the server: python manage.py runserver")
print("ðŸ”‘ Admin panel: http://localhost:8000/admin/")

