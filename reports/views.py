from django.shortcuts import render

# Create your views here.

def main_reports(request):
    '''show main reports page'''
    return render(request, 'reports/main-reports.html')
