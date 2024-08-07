from django.db import models

# Create your models here.
class note(models.Model):
    task=models.CharField(max_length=100)
    completed=models.BooleanField(default=False)
    created=models.DateField(auto_now_add=True)
    updated=models.DateField(auto_now=True)

    def __str__(self) -> str:
        return self.task