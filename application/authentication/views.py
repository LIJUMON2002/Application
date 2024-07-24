from django.http import JsonResponse
import jwt
from datetime import datetime, timedelta
from .models import UserInfo
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def register(request):

    if request.method == 'POST' and request.FILES.get('file'):
        try:
            data = request.POST
            first_name = data.get('firstname')
            last_name = data.get('lastname')
            email = data.get('email')
            password = data.get('password')
            date_of_birth = data.get('dob')
            gender = data.get('gender')
            phone_number = data.get('phone')
            address = data.get('address')
            profile_picture = request.FILES['file']

            if  not first_name or not last_name or not email or not password or not date_of_birth or not address or not gender or not phone_number:
                return JsonResponse({'error': 'All fields are required'}, status=400)
            
            if not profile_picture:
                return JsonResponse({'error':'No Profile Picture provided'}, status=400)
            
            if UserInfo.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already exists'}, status=400)
            
            if UserInfo.objects.filter(phone_number=phone_number).exists():
                return JsonResponse({'error': 'Phone Number already exists'}, status=400)
            
            user = UserInfo( first_name=first_name, last_name=last_name, email=email, password=password, date_of_birth=date_of_birth, gender=gender, phone_number=phone_number, address=address, profile_picture=profile_picture)
            user.save()

            return JsonResponse({'message': 'Account Created Successfully'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid Form data'}, status=400)
    
    elif request.method == 'POST':
        return JsonResponse({'error': 'No File Attached'}, status=405)
    
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    

@csrf_exempt
def login(request):
    if request.method == 'POST':

        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            if   not email or not password:
                return JsonResponse({'error': 'All fields are required'}, status=400)
            
            user = UserInfo.objects.filter(email=email, password=password).first()

            if not user:
                return JsonResponse({'error': 'Invalid username or password'}, status=401)
            
            user_details = {
                'firstname': user.first_name,
                'lastname' : user.last_name,
                'email'    : user.email,
                'phone'    : user.phone_number,
                'gender'   : user.gender,
                'address'  : user.address,
                'dob'      : user.date_of_birth.isoformat(),
                'profile'  : request.build_absolute_uri(user.profile_picture.url)
            }

            token = jwt.encode({'user': user_details, 'exp': datetime.utcnow() + timedelta(minutes=30)}, 'SECRET_KEY')
            return JsonResponse({'token': token}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid Form data'}, status=400)
        
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)