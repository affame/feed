# Generated by Django 4.2.1 on 2024-01-22 18:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feeder', '0012_volunteercustomfield'),
    ]

    operations = [
        migrations.AddField(
            model_name='volunteercustomfield',
            name='type',
            field=models.CharField(default='string', max_length=20, verbose_name='Тип данных'),
            preserve_default=False,
        ),
    ]
