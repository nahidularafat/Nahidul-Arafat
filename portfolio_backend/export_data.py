import os
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portfolio_backend.settings")
django.setup()

from portfolio.models import Profile, SocialLink, Project, CareerEntry, AboutSkill, ExpertiseArea, TechCategory, Stat
from portfolio.serializers import ProfileSerializer, SocialLinkSerializer, ProjectSerializer, CareerEntrySerializer, AboutSkillSerializer, ExpertiseAreaSerializer, TechCategorySerializer, StatSerializer

data = {
    "profile": ProfileSerializer(Profile.objects.first()).data if Profile.objects.exists() else None,
    "socialLinks": SocialLinkSerializer(SocialLink.objects.all(), many=True).data,
    "projects": ProjectSerializer(Project.objects.all(), many=True).data,
    "career": CareerEntrySerializer(CareerEntry.objects.all(), many=True).data,
    "aboutSkills": AboutSkillSerializer(AboutSkill.objects.all(), many=True).data,
    "expertiseAreas": ExpertiseAreaSerializer(ExpertiseArea.objects.all(), many=True).data,
    "techCategories": TechCategorySerializer(TechCategory.objects.all(), many=True).data,
    "stats": StatSerializer(Stat.objects.all(), many=True).data,
}

with open("../Portfolio-Website-main/src/data/staticData.json", "w") as f:
    json.dump(data, f, indent=2)

print("Data exported successfully!")

