import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

from portfolio.models import Project, ProjectBullet

# Check if project already exists
existing = Project.objects.filter(title='BARAQA_BIN').first()
if existing:
    existing.bullets.all().delete()
    existing.delete()

p = Project.objects.create(
    number='05',
    title='BARAQA_BIN',
    category='Smart Waste Management / IoT',
    tools='ESP32, ESP8266, FastAPI, React, YOLOv8 Nano',
    order=4,
    image_static_path='/images/placeholder.webp' # fallback image until user uploads one in admin
)

bullets = [
    "Bangladesh's waste crisis is not a knowledge problem — it is a habit problem. We decided to solve it from the very root: childhood.",
    "If a child learns to dispose waste correctly from an early age, that behavior stays for life. When an entire generation grows up with this habit, Bangladesh will not need enforcement — cleanliness will simply become their nature.",
    "BARAQA_BIN makes this possible. Students earn reward points every time they use the correct bin. A live leaderboard creates healthy daily competition.",
    "Achievement badges like \"Eco Warrior\" celebrate consistency. Monthly rewards include canteen discounts and tuition fee waivers — making responsible behavior genuinely worthwhile.",
    "We collaborate with schools to make this a natural daily routine — not an extra activity. One habit. One generation. One clean Bangladesh."
]

for i, text in enumerate(bullets):
    ProjectBullet.objects.create(project=p, order=i, text=text)

print("BARAQA_BIN project added successfully!")
