# Generated by Django 4.2.1 on 2023-07-01 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feeder', '0010_alter_volunteer_group_badge'),
    ]

    operations = [
        migrations.AddField(
            model_name='volunteer',
            name='printing_batch',
            field=models.IntegerField(blank=True, null=True, verbose_name='Партия бейджа'),
        ),
        migrations.AddField(
            model_name='volunteer',
            name='role',
            field=models.TextField(blank=True, null=True, verbose_name='Роль'),
        ),
    ]
