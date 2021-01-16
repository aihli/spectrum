# Generated by Django 3.1.5 on 2021-01-16 08:41

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Articles',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('url', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='Keywords',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('value', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='Rebuttals',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rebuttal', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=250), size=5)),
                ('source', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='source', to='article.articles')),
                ('user', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='History',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('record', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, to='article.rebuttals')),
                ('user', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='articles',
            name='keyword',
            field=models.ManyToManyField(to='article.Keywords'),
        ),
    ]
