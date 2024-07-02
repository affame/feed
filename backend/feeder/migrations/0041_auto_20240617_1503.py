# Generated by Django 4.2.13 on 2024-06-17 15:03

from django.db import migrations

from feeder.models import Volunteer


def fix_qr(self, schema_editor):
    volunteers = Volunteer.objects.all()
    for volunteer in volunteers:
        qr = volunteer.qr
        if qr:
            volunteer.qr = qr.replace("-", "")
            volunteer.save()


class Migration(migrations.Migration):

    dependencies = [
        ('feeder', '0040_merge_20240613_0949'),
    ]

    operations = [
        migrations.RunPython(fix_qr),
    ]