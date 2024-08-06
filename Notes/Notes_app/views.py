from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import note
from .serializers import noteSerializer
# Create your views here.

@api_view(["GET","POST"])
def notes_list(request):
    if request.method == "GET":
        notes=note.objects.all()
        serializer=noteSerializer(notes,many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer=noteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



@api_view(["GET","PATCH","PUT","DELETE"])
def note_detail(request,pk):
    Note=get_object_or_404(note,id=pk)

    if request.method == "GET":
        serializer=noteSerializer(Note)
        return Response(serializer.data)
    
    elif request.method == "PATCH":
        serializer=noteSerializer(Note,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "DELETE":
        Note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)