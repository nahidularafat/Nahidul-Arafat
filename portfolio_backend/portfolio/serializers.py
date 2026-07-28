from rest_framework import serializers
# pyrefly: ignore [missing-import]
from .models import (
    Profile, SocialLink, Project, ProjectBullet,
    CareerEntry, Achievement, AboutSkill, ExpertiseArea,
    TechCategory, Tech, Stat, ExpertiseItem,
)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class ExpertiseItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpertiseItem
        fields = '__all__'


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = '__all__'


class ProjectBulletSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectBullet
        fields = ['id', 'text', 'order']


class ProjectSerializer(serializers.ModelSerializer):
    bullets = ProjectBulletSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'number', 'title', 'category', 'tools',
            'image_url', 'link', 'order', 'bullets',
        ]

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_static_path


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['id', 'highlight', 'description', 'order']


class CareerEntrySerializer(serializers.ModelSerializer):
    achievements = AchievementSerializer(many=True, read_only=True)

    class Meta:
        model = CareerEntry
        fields = [
            'id', 'entry_type', 'title', 'organization',
            'org_url', 'period', 'description', 'order', 'achievements',
        ]


class AboutSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSkill
        fields = '__all__'


class ExpertiseAreaSerializer(serializers.ModelSerializer):
    tags_list = serializers.SerializerMethodField()

    class Meta:
        model = ExpertiseArea
        fields = ['id', 'title', 'subtitle', 'description', 'tags', 'tags_list', 'order']

    def get_tags_list(self, obj):
        return obj.get_tags_list()


class TechSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tech
        fields = ['id', 'name', 'icon_url', 'color', 'order']


class TechCategorySerializer(serializers.ModelSerializer):
    techs = TechSerializer(many=True, read_only=True)

    class Meta:
        model = TechCategory
        fields = ['id', 'title', 'order', 'techs']


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = '__all__'
