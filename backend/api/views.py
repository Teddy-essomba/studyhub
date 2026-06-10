from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Task
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated


"""
@api_view(['GET'])
def hello(request):
    return Response({
        "message": "Hello from Django!"
    })
"""

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def task_list(request):
    if request.method == 'GET':
        tasks = Task.objects.filter(user=request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
       # Run validations (e.g., Is the title missing? Is it too long?)

        if serializer.is_valid():
            serializer.save()  # 3. If it looks good, create and save the new Task in the database
            serializer.save(user=request.user)
            return Response(serializer.data, status=201) # 4. Return the new task back as confirmation
        return Response(serializer.errors, status=400)



@api_view(['PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def task_detail(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response({"error": "Task not found"}, status=404)

    if request.method == 'PATCH':
        serializer = TaskSerializer(task, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    if request.method == 'DELETE':
        task.delete()
        return Response(status=204)

