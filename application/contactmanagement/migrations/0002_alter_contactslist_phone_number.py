# Generated by Django 3.2.25 on 2024-07-16 03:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contactmanagement', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contactslist',
            name='phone_number',
            field=models.CharField(max_length=15, unique=True),
        ),
    ]
