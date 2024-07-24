from django.conf import settings
from django.shortcuts import get_object_or_404
from django.http import HttpResponse,JsonResponse

from .models import ContactsList
import os
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def list_contacts(request):
    contacts = ContactsList.objects.all().order_by('first_name')
    contacts_data = [{'first_name': i.first_name, 'last_name': i.last_name, 'address': i.address, 'company': i.company, 'phone_number': i.phone_number} for i in contacts]
    return JsonResponse(contacts_data, safe=False)


@csrf_exempt
def filter_contacts(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            searchTerm = data.get('searchTerm')
            if not searchTerm:
                return JsonResponse({'error': 'All Fields are requirred'}, status=400)
            
            try:
                if searchTerm == 'firstname':
                    contacts = ContactsList.objects.all().order_by('first_name')
                elif searchTerm == 'lastname':
                    contacts = ContactsList.objects.all().order_by('last_name')
                elif searchTerm == 'address':
                    contacts = ContactsList.objects.all().order_by('address')
                elif searchTerm == 'company':
                    contacts = ContactsList.objects.all().order_by('company')
                else:
                    contacts = ContactsList.objects.all().order_by('phone_number')

                if not contacts.exists():
                    return JsonResponse({'error': 'No Contact found'}, status=404)
                
                contacts_data = [{'first_name': i.first_name, 'last_name': i.last_name, 'address': i.address, 'company': i.company, 'phone_number': i.phone_number} for i in contacts]
                return JsonResponse(contacts_data, safe=False)
            
            except ContactsList.DoesNotExist:
                return JsonResponse({'error': 'No Contact found'}, status=404)
            

        except Exception as e: 
            return JsonResponse({'error': str(e)}, status=500)
        
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def search_contacts(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            searchTerm = data.get('searchTerm')
            filterField = data.get('filter')

            if not searchTerm or not filterField:
                return JsonResponse({'error': 'All Fields are requirred'}, status=400)

            try:
                if filterField == 'firstname':
                    contacts = ContactsList.objects.filter(first_name=searchTerm)
                elif filterField == 'lastname':
                    contacts = ContactsList.objects.filter(last_name=searchTerm)
                elif filterField == 'address':
                    contacts = ContactsList.objects.filter(address=searchTerm)
                elif filterField == 'company':
                    contacts = ContactsList.objects.filter(company=searchTerm)
                else:
                    contacts = ContactsList.objects.filter(phone_number=searchTerm)

                if not contacts.exists():
                    return JsonResponse({'error': 'No Contact found'}, status=404)
                
                contacts_data = [{'first_name': i.first_name, 'last_name': i.last_name, 'address': i.address, 'company': i.company, 'phone_number': i.phone_number} for i in contacts]
                return JsonResponse(contacts_data, safe=False)
            
            except ContactsList.DoesNotExist:
                return JsonResponse({'error': 'No Contact found'}, status=404)

        except Exception as e: 
            return JsonResponse({'error': str(e)}, status=500)
        
    return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def add_contact(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            first_name = data.get('firstname')
            last_name = data.get('lastname')
            address = data.get('address')
            company = data.get('company')
            phone_number = data.get('phonenumber')
            
            if not first_name or not last_name or not address or not company or not phone_number:
                return JsonResponse({'error': 'All fields are requirred'}, status=400)
            
            file_instance = ContactsList.objects.create(first_name=first_name, last_name=last_name, address=address, company=company, phone_number=phone_number)
            return JsonResponse({'message': 'Contact Added successfully'}, status=201)
        
        except Exception as e: 
            return JsonResponse({'error': str(e)}, status=500)
        
    return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def edit_contact(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            first_name = data.get('firstname')
            last_name = data.get('lastname')
            address = data.get('address')
            company = data.get('company')
            phone_number = data.get('phonenumber')
            user = data.get('user')

            if not first_name or not last_name or not address or not company or not phone_number or not user:
                return JsonResponse({'error': 'All fields are required'}, status=400)

            try:
                contact = ContactsList.objects.get(first_name=user['first_name'],last_name=user['last_name'],address=user['address'],company=user['company'] ,phone_number=user['phone_number'])
            except ContactsList.DoesNotExist:
                return JsonResponse({'error': 'Contact not found'}, status=404)

            contact.first_name = first_name
            contact.last_name = last_name
            contact.address = address
            contact.company = company
            contact.phone_number = phone_number
            contact.save()

            return JsonResponse({'message': 'Contact updated successfully'}, status=200)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
    return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def delete_contact(request):
    if request.method == 'POST' : 
        try:
            data = json.loads(request.body)
            first_name = data.get('first_name')
            last_name = data.get('last_name')
            address = data.get('address')
            company = data.get('company')
            phone_number = data.get('phone_number')

            contact = get_object_or_404(ContactsList,first_name=first_name,last_name=last_name,address=address,company=company ,phone_number=phone_number)
            contact.delete()
            return JsonResponse({'message': 'Contact deleted successfully'}, status=200)
        except:
            return JsonResponse({'error': 'Contact not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

