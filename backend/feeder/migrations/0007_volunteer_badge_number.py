# Generated by Django 4.2.1 on 2023-06-03 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feeder', '0006_feedtransaction_is_vegan'),
    ]

    operations = [
        migrations.AddField(
            model_name='volunteer',
            name='badge_number',
            field=models.TextField(blank=True, null=True, verbose_name='Номер бейджа'),
        ),
    ]
