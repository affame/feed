# Generated by Django 4.2.1 on 2024-05-25 10:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feeder', '0035_remove_old_roles'),
    ]

    operations = [
        migrations.AddField(
            model_name='volunteer',
            name='direction_head_comment',
            field=models.TextField(blank=True, null=True, verbose_name='Комментарий руководителя локации'),
        ),
    ]