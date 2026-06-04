from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Task
from .serializers import TaskSerializer

"""
@api_view(['GET'])
def hello(request):
    return Response({
        "message": "Hello from Django!"
    })
"""

@api_view(['GET', 'POST'])
def task_list(request):
    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
       # Run validations (e.g., Is the title missing? Is it too long?)

        if serializer.is_valid():
            serializer.save()  # 3. If it looks good, create and save the new Task in the database
            return Response(serializer.data, status=201) # 4. Return the new task back as confirmation
        return Response(serializer.errors, status=400)



@api_view(['PATCH', 'DELETE'])
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

