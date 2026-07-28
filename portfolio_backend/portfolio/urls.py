from django.urls import path
# pyrefly: ignore [missing-import]
from . import views

urlpatterns = [
    path('', views.api_root, name='api-root'),
    path('profile/', views.profile, name='profile'),
    path('social-links/', views.social_links, name='social-links'),
    path('projects/', views.projects, name='projects'),
    path('career/', views.career, name='career'),
    path('about-skills/', views.about_skills, name='about-skills'),
    path('expertise-areas/', views.expertise_areas, name='expertise-areas'),
    path('expertise-items/', views.expertise_items, name='expertise-items'),
    path('tech-categories/', views.tech_categories, name='tech-categories'),
    path('stats/', views.stats, name='stats'),
]
