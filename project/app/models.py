from django.db import models

class WBTable(models.Model):
    name = models.TextField()
    price = models.FloatField()
    discount_price = models.FloatField()
    rating = models.FloatField()
    reviews_count = models.IntegerField()

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'



