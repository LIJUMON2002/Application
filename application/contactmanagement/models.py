from django.db import models

class ContactsList(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    address = models.TextField()
    company = models.TextField()
    phone_number = models.CharField(max_length=15,unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.phone_number})"