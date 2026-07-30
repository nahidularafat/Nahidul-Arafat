import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

from portfolio.models import Project

# Update the 'BARAQA_BIN' project (number '05')
project = Project.objects.filter(number='05').first()
if project:
    project.image = 'projects/baraqa_bin.png'
    project.save()
    print("Successfully updated image for BARAQA_BIN!")
else:
    print("Project not found.")
