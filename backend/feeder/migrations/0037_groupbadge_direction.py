# Generated by Django 4.2.1 on 2024-06-05 16:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('feeder', '0036_volunteer_direction_head_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='groupbadge',
            name='direction',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='feeder.direction'),
        ),
    ]