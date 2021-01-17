from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Keywords(models.Model):
    id = models.AutoField(primary_key=True)
    value = models.CharField(max_length=250)


class Articles(models.Model):
    id = models.AutoField(primary_key=True)
    url = models.CharField(max_length=250)
    keyword = models.ManyToManyField(Keywords)


class Rebuttals(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, editable=False)
    source = models.ForeignKey(Articles, on_delete=models.CASCADE, related_name='source')
    rebuttal = ArrayField(
        models.CharField(max_length=250, blank=True),
        size = 5,
        blank=True,
        default=list
    )
    date = models.DateField(blank=True, null=True)

    class Meta:
        unique_together = ('user', 'source')


class History(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, editable=False)
    record = models.ForeignKey(Rebuttals, on_delete=models.CASCADE, editable=False)
