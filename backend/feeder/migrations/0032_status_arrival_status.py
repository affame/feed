# Generated by Django 4.2.1 on 2024-05-10 15:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('feeder', '0031_merge_20240503_1919'),
    ]

    operations = [
        migrations.CreateModel(
            name='Status',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Дата обновления')),
                ('id', models.CharField(max_length=20, primary_key=True, serialize=False, verbose_name='Код')),
                ('name', models.CharField(max_length=255, verbose_name='Наименование')),
                ('visible', models.CharField(max_length=255, verbose_name='В список')),
                ('description', models.CharField(max_length=255, verbose_name='Примечание')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='arrival',
            name='status',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='feeder.status'),
        ),
    ]