from django.shortcuts import render
from django.http import JsonResponse
import json
from .scripts.get_winddata import process_wind_data

# Create your views here.
path = 'media/data/'

def main_reports(request):
    '''show main reports page'''
    data = process_wind_data(path)
    context = {
        'data': data['data'],
        'max_ws10': data['max_ws10'],
        'first_date': data['first_date'],
        'last_date': data['last_date'],
        'max_temp': data['max_temp'],
        'min_temp': data['min_temp'],
        'max_hs': data['max_hs'],
    }
    return render(request, 'reports/main-reports.html', context)

# def get_wind_data(request):

#     # data = process_wind_data(path)

#     return JsonResponse()
