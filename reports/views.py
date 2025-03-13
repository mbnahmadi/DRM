from django.shortcuts import render
from django.http import JsonResponse
import json
from .scripts.get_winddata import process_wind_data

# Create your views here.
path = 'media/data/'

def main_reports(request):
    '''show main reports page'''
    data = process_wind_data(path)
    return render(request, 'reports/main-reports.html', {'data': data})

def get_wind_data(request):

    # data = process_wind_data(path)

    return JsonResponse()
