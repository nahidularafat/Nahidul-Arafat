import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

from portfolio.models import Project

# Update the 'BUBT Bus Tracker' project (number '04')
project = Project.objects.filter(number='04').first()
if project:
    project.image = 'projects/bubt_bus_tracker.jpg'
    project.save()
    print("Successfully updated image for BUBT Bus Tracker!")
else:
    print("Project not found.")
