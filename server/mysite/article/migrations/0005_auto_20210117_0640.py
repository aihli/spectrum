# Generated by Django 3.1.5 on 2021-01-17 06:40

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0004_auto_20210117_0631'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rebuttals',
            name='rebuttal',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=250), blank=True, default=list, size=5),
        ),
    ]
