# Generated by Django 3.1.5 on 2021-01-17 06:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0003_auto_20210117_0628'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rebuttals',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
