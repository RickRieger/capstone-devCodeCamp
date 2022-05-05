# Generated by Django 4.0.4 on 2022-05-04 16:10

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_user_friends'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='friends',
            field=models.ManyToManyField(blank=True, related_name='userDude_friends', to=settings.AUTH_USER_MODEL),
        ),
    ]