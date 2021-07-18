from myapp.models import userinp
from django.shortcuts import render
from .swap import swap

def index(request):
    if request.method == "POST":
        user_input = request.POST.get('inp')
        data = userinp(user_input = user_input)
        data.save()
    request.session['user_input'] = user_input
    user_input = swap(user_input)
    # userf = swap.swap(user_input)
    return render(request, "home.html", {'userd': user_input});




