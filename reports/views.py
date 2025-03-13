from django.shortcuts import render
from django.http import JsonResponse
import json

# Create your views here.

def main_reports(request):
    '''show main reports page'''
    return render(request, 'reports/main-reports.html')


def get_wind_data(request):
    # فرض کنید داده‌ها از دیتابیس یا محاسبات آمده‌اند
    labels = ["00", "03", "06", "09", "12", "15", "18", "21"],  # زمان‌ها
    datasets = [
        {
            "label": "WS 10m",
            "data": [5, 7, 10, 15, 20, 18, 12, 8],
            "borderColor": "blue",
            "fill": "false"
        },
        {
            "label": "WG 10m",
            "data": [6, 8, 11, 16, 22, 19, 13, 9],
            "borderColor": "red",
            "fill": "false"
        },
        {
            "label": "WS 50m",
            "data": [4, 6, 9, 14, 19, 17, 11, 7],
            "borderColor": "yellow",
            "fill": "false"
        },
        {
            "label": "WG 50m",
            "data": [5, 7, 10, 15, 20, 18, 12, 8],
            "borderColor": "black",
            "fill": "false"
        }
    ]

    response_data = {
        "chart": {
            "labels": labels,
            "datasets": datasets
        }
    }
    return JsonResponse(response_data)
