from django.shortcuts import render
def index(request):
      
    # render function takes argument  - request
    # and return HTML as response
    return render(request, "home.html")

# Create your views here.
