from rest_framework import serializers
from .models import Task
class TaskSerializer(serializers.ModelSerializer):
    due_date = serializers.DateField(required=False, allow_null=True)
    class Meta:
        model = Task
        fields = ['id', 'title', 'completed', 'category', 'due_date']


