from myapp.models import userinp
from django.shortcuts import render
from .swap import swap

def index(request):
    user_input="ok"
    if request.method == "POST":
        user_input = request.POST.get('inp')
        data = userinp(user_input = user_input)
        data.save()
    user_input = swap(user_input)
    request.session['user_input'] = user_input
    # userf = swap.swap(user_input)
    return render(request, "home.html", {'userd': user_input});




