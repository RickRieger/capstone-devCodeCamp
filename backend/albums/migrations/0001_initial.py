# Generated by Django 4.0.4 on 2022-05-09 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album_id', models.IntegerField(unique=True)),
                ('title', models.CharField(max_length=255)),
                ('artist', models.CharField(max_length=255)),
                ('image', models.CharField(max_length=255)),
                ('preview', models.CharField(max_length=255)),
                ('preview_title', models.CharField(max_length=255)),
            ],
        ),
    ]
