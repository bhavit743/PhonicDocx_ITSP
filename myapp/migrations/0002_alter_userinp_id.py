# Generated by Django 3.2.4 on 2021-07-19 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinp',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
