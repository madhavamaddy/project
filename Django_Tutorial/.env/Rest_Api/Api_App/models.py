# userapp/models.py
from django.db import models
import secrets

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    token = models.CharField(max_length=40, blank=True, null=True)

    def __str__(self):
        return self.username

    def check_password(self, raw_password):
        return self.password == raw_password

    def set_password(self, raw_password):
        self.password = raw_password
        self.save()

    def generate_token(self):
        """Generates a random token and saves it."""
        self.token = secrets.token_hex(20)
        self.save()
        return self.token

    def clear_token(self):
        """Clears the token upon logout."""
        self.token = None
        self.save()
