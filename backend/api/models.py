from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Task(models.Model):
    # 2. Link each task to a specific user.
    # If the user is deleted, their tasks vanish too (CASCADE).
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    due_date = models.DateField(null=True, blank=True)
    category = models.CharField(max_length=50)
    def __str__(self):
        return self.title

