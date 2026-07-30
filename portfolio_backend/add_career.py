import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

from portfolio.models import CareerEntry

existing = CareerEntry.objects.filter(organization='BARAQA_BIN - AI-IoT Smart Bin Startup').first()
if existing:
    existing.delete()

# Shift existing entries order up by 1 (only regular jobs/education) to place this at the top
for e in CareerEntry.objects.exclude(entry_type='achievements'):
    if e.order == 0:
        e.order = 1
        e.save()
    elif e.order == 1:
        e.order = 2
        e.save()

desc = """Founded and led BARAQA_BIN, an AI-IoT smart bin startup for educational institutions.
Designed a reward-based system where students receive rewards after throwing waste into the smart bin.
Integrated RFID, sensors, IoT components, and AI-based waste detection for smart monitoring.
Developed a MERN stack-based website/dashboard to track bin activity, manage users, and support reward-based participation.

Tools & Tech Stack: C++, Python, Django, FastAPI, MySQL, React.js, YOLOv8, ESP32-CAM, RFID."""

CareerEntry.objects.create(
    entry_type='job',
    title='Founder & CEO',
    organization='BARAQA_BIN - AI-IoT Smart Bin Startup',
    period='Feb 2025 - Present',
    description=desc,
    order=0
)

print("Added BARAQA_BIN to Career entries successfully!")
