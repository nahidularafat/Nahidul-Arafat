from django.db import models


class Profile(models.Model):
    """Single-record model for the portfolio owner's info."""
    name = models.CharField(max_length=100, default="Nahidul Arafat")
    first_name = models.CharField(max_length=50, default="NAHIDUL")
    last_name = models.CharField(max_length=50, default="ARAFAT")
    tagline = models.CharField(max_length=100, default="A Passionate")
    role_line1 = models.CharField(max_length=80, default="FULL STACK")
    role_line2 = models.CharField(max_length=80, default="ENGINEER")
    bio = models.TextField(
        blank=True,
        default="A passionate Full Stack Engineer specializing in Python, Django, and React. "
                "I build scalable web platforms, AI-powered agents, and real-world mobile applications.",
        help_text="Short bio / summary shown on the portfolio or CV."
    )
    email = models.EmailField(default="nahidularaf@gmail.com")
    phone = models.CharField(max_length=30, default="+880 1974-337424")
    location = models.CharField(max_length=100, blank=True, default="Dhaka, Bangladesh")
    github_url = models.URLField(blank=True, default="https://github.com/nahidularafat")
    linkedin_url = models.URLField(blank=True, default="https://www.linkedin.com/in/nahidul-arafat-9ab8332ba")
    codeforces_url = models.URLField(blank=True, default="https://codeforces.com/profile/Arafat0012")
    codechef_url = models.URLField(blank=True, default="https://www.codechef.com/users/nahidularaf")
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    resume_url = models.CharField(max_length=255, default="/resume.pdf")
    copyright_year = models.CharField(max_length=10, default="2025")

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"

    def __str__(self):
        return self.name


class ExpertiseItem(models.Model):
    """
    Simple expertise summary boxes (e.g. Frontend, Backend, Database, DevOps).
    Shown in the Expertise section with title + comma-separated skills.
    """
    title = models.CharField(max_length=80, help_text="E.g. 'Frontend'")
    skills = models.CharField(
        max_length=255,
        help_text="Comma-separated skills, e.g. 'React, HTML, CSS, Tailwind'"
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Expertise Item"
        verbose_name_plural = "Expertise Items"

    def __str__(self):
        return self.title


class SocialLink(models.Model):
    """Social / competitive programming links shown in the social icons bar."""
    PLATFORM_CHOICES = [
        ('github', 'GitHub'),
        ('linkedin', 'LinkedIn'),
        ('codeforces', 'Codeforces'),
        ('codechef', 'CodeChef'),
        ('twitter', 'X / Twitter'),
        ('instagram', 'Instagram'),
        ('other', 'Other'),
    ]
    platform = models.CharField(max_length=30, choices=PLATFORM_CHOICES)
    label = models.CharField(max_length=50, help_text="Display label, e.g. 'Github'")
    url = models.URLField()
    icon_name = models.CharField(
        max_length=50,
        help_text="react-icons fa6 key, e.g. FaGithub, FaLinkedinIn, FaCodepen"
    )
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']
        verbose_name = "Social Link"
        verbose_name_plural = "Social Links"

    def __str__(self):
        return f"{self.platform} — {self.url}"


class Project(models.Model):
    """Portfolio work / project entries (Work section)."""
    number = models.CharField(max_length=5, help_text="Display number e.g. '01'")
    title = models.CharField(max_length=150)
    category = models.CharField(max_length=100, help_text="E.g. 'Corporate Website'")
    tools = models.CharField(max_length=255, help_text="Comma-separated tools list")
    image = models.ImageField(
        upload_to='projects/',
        blank=True,
        null=True,
        help_text="Project screenshot. Leave blank to use static placeholder."
    )
    image_static_path = models.CharField(
        max_length=255,
        default="/images/placeholder.webp",
        help_text="Fallback static path if no image uploaded"
    )
    link = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return f"{self.number} — {self.title}"

    def get_image_url(self):
        if self.image:
            return self.image.url
        return self.image_static_path


class ProjectBullet(models.Model):
    """Individual bullet-point description for a project."""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='bullets')
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.project.title}: {self.text[:60]}"


class CareerEntry(models.Model):
    """A career, education, or achievements entry in the timeline."""
    TYPE_CHOICES = [
        ('job', 'Job / Work Experience'),
        ('education', 'Education'),
        ('achievements', 'Achievements Box'),
    ]
    entry_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='job')
    title = models.CharField(max_length=150)
    organization = models.CharField(max_length=150, blank=True)
    org_url = models.URLField(blank=True)
    period = models.CharField(max_length=50, help_text="E.g. 'Present' or '2022-2026'")
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Career Entry"
        verbose_name_plural = "Career Entries"

    def __str__(self):
        return f"{self.title} @ {self.organization}"


class Achievement(models.Model):
    """Individual achievement bullet for the Achievements box in Career section."""
    career_entry = models.ForeignKey(CareerEntry, on_delete=models.CASCADE, related_name='achievements')
    highlight = models.CharField(max_length=200, help_text="Bold part of the achievement")
    description = models.TextField(blank=True, help_text="Rest of the achievement text")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.highlight[:80]


class AboutSkill(models.Model):
    """Skills shown in the About / Expertise timeline section."""
    title = models.CharField(max_length=100)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "About Skill"
        verbose_name_plural = "About Skills"

    def __str__(self):
        return self.title


class ExpertiseArea(models.Model):
    """Accordion items in the 'What I Do' section."""
    title = models.CharField(max_length=80, help_text="E.g. 'FRONTEND'")
    subtitle = models.CharField(max_length=80, help_text="E.g. 'Interface'")
    description = models.TextField()
    tags = models.TextField(help_text="Comma-separated skill tags")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Expertise Area"
        verbose_name_plural = "Expertise Areas"

    def __str__(self):
        return self.title

    def get_tags_list(self):
        return [t.strip() for t in self.tags.split(',') if t.strip()]


class TechCategory(models.Model):
    """A category grouping for the Tech Stack section."""
    title = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Tech Category"
        verbose_name_plural = "Tech Categories"

    def __str__(self):
        return self.title


class Tech(models.Model):
    """Individual technology/tool within a TechCategory."""
    category = models.ForeignKey(TechCategory, on_delete=models.CASCADE, related_name='techs')
    name = models.CharField(max_length=80)
    icon_url = models.URLField(help_text="CDN URL to the devicon SVG")
    color = models.CharField(max_length=20, help_text="Hex glow color e.g. #22C55E")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Technology"
        verbose_name_plural = "Technologies"

    def __str__(self):
        return f"{self.name} ({self.category})"


class Stat(models.Model):
    """Bottom stats bar in TechStack: e.g. '32+ Technologies'."""
    label = models.CharField(max_length=60)
    value = models.CharField(max_length=20, help_text="Display value e.g. '32+' or '500+'")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Stat"
        verbose_name_plural = "Stats"

    def __str__(self):
        return f"{self.value} {self.label}"
