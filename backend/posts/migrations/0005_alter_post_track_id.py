# Generated by Django 4.0.4 on 2022-05-19 06:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_alter_post_track_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='track_id',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
