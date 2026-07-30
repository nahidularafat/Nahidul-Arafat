import os
import sys

def modify_seed_data():
    with open('seed_data.py', 'r', encoding='utf-8') as f:
        content = f.read()

    # Define strings to replace
    project_search = "        ],\n    },\n]"
    project_replace = """        ],
    },
    {
        "number": "05",
        "title": "BARAQA_BIN",
        "category": "AI-IoT Smart Bin Startup",
        "tools": "C++, Python, Django, YOLOv8, ESP32-CAM, React.js, MySQL, FastAPI, RFID",
        "link": "",
        "image": "projects/baraqa_bin.png",
        "order": 4,
        "bullets": [
            "Bangladesh's waste crisis is not a knowledge problem — it is a habit problem. We decided to solve it from the very root: childhood.",
            "If a child learns to dispose waste correctly from an early age, that behavior stays for life. When an entire generation grows up with this habit, Bangladesh will not need enforcement — cleanliness will simply become their nature.",
            "BARAQA_BIN makes this possible. Students earn reward points every time they use the correct bin. A live leaderboard creates healthy daily competition.",
            "Achievement badges like \\"Eco Warrior\\" celebrate consistency. Monthly rewards include canteen discounts and tuition fee waivers — making responsible behavior genuinely worthwhile.",
            "We collaborate with schools to make this a natural daily routine — not an extra activity. One habit. One generation. One clean Bangladesh."
        ],
    },
]"""
    if project_search in content:
        content = content.replace(project_search, project_replace)
    else:
        print("Project search string not found.")
        return

    # Career replacement
    career_search = """job = CareerEntry.objects.create(
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
)"""

    career_replace = """job_baraqa = CareerEntry.objects.create(
    entry_type='job',
    title='Founder & CEO',
    organization='BARAQA_BIN - AI-IoT Smart Bin Startup',
    org_url='',
    period='Feb 2025 - Present',
    description=(
        "Founded and led BARAQA_BIN, an AI-IoT smart bin startup for educational institutions.\\n"
        "Designed a reward-based system where students receive rewards after throwing waste into the smart bin.\\n"
        "Integrated RFID, sensors, IoT components, and AI-based waste detection for smart monitoring.\\n"
        "Developed a MERN stack-based website/dashboard to track bin activity, manage users, and support reward-based participation.\\n\\n"
        "Tools & Tech Stack: C++, Python, Django, FastAPI, MySQL, React.js, YOLOv8, ESP32-CAM, RFID."
    ),
    order=0,
)

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
    order=1,
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
    order=2,
)

ach_entry = CareerEntry.objects.create(
    entry_type='achievements',
    title='Achievements & Competitions',
    organization='Hackathons & Olympiads',
    period='',
    order=3,
)"""

    if career_search in content:
        content = content.replace(career_search, career_replace)
    else:
        print("Career search string not found.")
        return

    with open('seed_data.py', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Success!")

if __name__ == "__main__":
    modify_seed_data()
