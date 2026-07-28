from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# pyrefly: ignore [missing-import]
from .models import (
    Profile, SocialLink, Project, CareerEntry,
    AboutSkill, ExpertiseArea, TechCategory, Stat, ExpertiseItem,
)
# pyrefly: ignore [missing-import]
from .serializers import (
    ProfileSerializer, SocialLinkSerializer, ProjectSerializer,
    CareerEntrySerializer, AboutSkillSerializer, ExpertiseAreaSerializer,
    TechCategorySerializer, StatSerializer, ExpertiseItemSerializer,
)


@api_view(['GET'])
def profile(request):
    """Return the single portfolio owner profile."""
    obj = Profile.objects.first()
    if not obj:
        return Response({'detail': 'Profile not configured.'}, status=status.HTTP_404_NOT_FOUND)
    serializer = ProfileSerializer(obj, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def social_links(request):
    """Return all active social links ordered by `order`."""
    qs = SocialLink.objects.filter(is_active=True)
    serializer = SocialLinkSerializer(qs, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def projects(request):
    """Return all active projects with nested bullets."""
    qs = Project.objects.filter(is_active=True).prefetch_related('bullets')
    serializer = ProjectSerializer(qs, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def career(request):
    """Return all career entries with nested achievements."""
    qs = CareerEntry.objects.all().prefetch_related('achievements')
    serializer = CareerEntrySerializer(qs, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def about_skills(request):
    """Return all About/Expertise timeline skills."""
    qs = AboutSkill.objects.all()
    serializer = AboutSkillSerializer(qs, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def expertise_areas(request):
    """Return all 'What I Do' accordion items."""
    qs = ExpertiseArea.objects.all()
    serializer = ExpertiseAreaSerializer(qs, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def tech_categories(request):
    """Return all tech categories with nested tech items."""
    qs = TechCategory.objects.all().prefetch_related('techs')
    serializer = TechCategorySerializer(qs, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def stats(request):
    """Return the bottom stats for the TechStack section."""
    qs = Stat.objects.all()
    serializer = StatSerializer(qs, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def expertise_items(request):
    """Return expertise summary boxes (Frontend, Backend, Database, DevOps)."""
    qs = ExpertiseItem.objects.all()
    serializer = ExpertiseItemSerializer(qs, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def api_root(request):
    """API root listing all available endpoints."""
    return Response({
        'profile': '/api/profile/',
        'social_links': '/api/social-links/',
        'projects': '/api/projects/',
        'career': '/api/career/',
        'about_skills': '/api/about-skills/',
        'expertise_areas': '/api/expertise-areas/',
        'expertise_items': '/api/expertise-items/',
        'tech_categories': '/api/tech-categories/',
        'stats': '/api/stats/',
    })
