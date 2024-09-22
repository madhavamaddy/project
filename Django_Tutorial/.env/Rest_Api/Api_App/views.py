# userapp/views.py
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import User
from .serializers import RegisterSerializer, LoginSerializer, ProfileUpdateSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.get(username=serializer.data['username'])
                if user.check_password(serializer.data['password']):
                    token = user.generate_token()  # Generate and return a token on login
                    return Response({"token": token, "message": "Login successful"}, status=status.HTTP_200_OK)
                return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        token = request.headers.get('Authorization')
        if token:
            try:
                user = User.objects.get(token=token)
                user.clear_token()  # Clear the token on logout
                return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "No token provided"}, status=status.HTTP_400_BAD_REQUEST)

class ProfileUpdateView(APIView):
    def put(self, request):
        token = request.headers.get('Authorization')
        if token:
            try:
                user = User.objects.get(token=token)
                serializer = ProfileUpdateSerializer(user, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "No token provided"}, status=status.HTTP_400_BAD_REQUEST)

    
class ProfileView(APIView):
    def get(self, request):
        token = request.headers.get('Authorization')
        if token:
            try:
                user = User.objects.get(token=token)
                serializer = ProfileUpdateSerializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "No token provided"}, status=status.HTTP_400_BAD_REQUEST)
