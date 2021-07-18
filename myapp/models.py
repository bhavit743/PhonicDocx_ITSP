from django.db import models
from django.db.models.base import Model

class userinp(models.Model):
    id = models.AutoField(primary_key=True)
    user_input = models.TextField(null=True)
