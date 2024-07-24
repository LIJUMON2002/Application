from django.urls import path
from .views import add_contact,list_contacts,delete_contact,search_contacts,edit_contact,filter_contacts

urlpatterns = [
    path('add/', add_contact, name='add'),
    path('list/', list_contacts, name='list'),
    path('delete/', delete_contact, name='delete'),
    path('edit/', edit_contact, name='edit'),
    path('search/', search_contacts, name='search'),
    path('filter/', filter_contacts, name='filter'),
]