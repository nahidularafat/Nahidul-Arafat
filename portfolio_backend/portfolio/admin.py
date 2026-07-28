from django.contrib import admin
# pyrefly: ignore [missing-import]
from .models import (
    Profile, SocialLink, Project, ProjectBullet,
    CareerEntry, Achievement, AboutSkill, ExpertiseArea,
    TechCategory, Tech, Stat, ExpertiseItem,
)


# ─── Inlines ─────────────────────────────────────────────────────────────────

class ProjectBulletInline(admin.TabularInline):
    model = ProjectBullet
    extra = 1
    fields = ('text', 'order')
    ordering = ('order',)


class AchievementInline(admin.TabularInline):
    model = Achievement
    extra = 1
    fields = ('highlight', 'description', 'order')
    ordering = ('order',)


class TechInline(admin.TabularInline):
    model = Tech
    extra = 1
    fields = ('name', 'icon_url', 'color', 'order')
    ordering = ('order',)


# ─── Model Admins ─────────────────────────────────────────────────────────────

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'location')
    fieldsets = (
        ('Hero Section', {
            'fields': ('first_name', 'last_name', 'tagline', 'role_line1', 'role_line2')
        }),
        ('Bio / Summary', {
            'fields': ('bio',),
            'description': 'Short summary shown on CV / portfolio about section.',
        }),
        ('Contact Info', {
            'fields': ('email', 'phone', 'location')
        }),
        ('Social & Links', {
            'fields': ('github_url', 'linkedin_url', 'codeforces_url', 'codechef_url')
        }),
        ('Media & Files', {
            'fields': ('profile_image', 'resume_url')
        }),
        ('Footer', {
            'fields': ('copyright_year',)
        }),
    )


@admin.register(ExpertiseItem)
class ExpertiseItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'skills', 'order')
    list_editable = ('order',)
    ordering = ('order',)


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ('platform', 'label', 'url', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    ordering = ('order',)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('number', 'title', 'category', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    ordering = ('order',)
    inlines = [ProjectBulletInline]
    fieldsets = (
        ('Basic Info', {
            'fields': ('number', 'title', 'category', 'tools', 'order', 'is_active')
        }),
        ('Image & Link', {
            'fields': ('image', 'image_static_path', 'link'),
            'description': 'Upload an image OR keep the static path as fallback.',
        }),
    )


@admin.register(CareerEntry)
class CareerEntryAdmin(admin.ModelAdmin):
    list_display = ('title', 'organization', 'period', 'entry_type', 'order')
    list_editable = ('order',)
    ordering = ('order',)
    inlines = [AchievementInline]


@admin.register(AboutSkill)
class AboutSkillAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    list_editable = ('order',)
    ordering = ('order',)


@admin.register(ExpertiseArea)
class ExpertiseAreaAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'order')
    list_editable = ('order',)
    ordering = ('order',)


@admin.register(TechCategory)
class TechCategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    list_editable = ('order',)
    ordering = ('order',)
    inlines = [TechInline]


@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ('value', 'label', 'order')
    list_editable = ('order',)
    ordering = ('order',)
