from django.db import models

class UserInfo(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=15)
    address = models.TextField()
    profile_picture = models.ImageField(upload_to='profile_pictures/')

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"
