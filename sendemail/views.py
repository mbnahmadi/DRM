from django.core.mail import send_mail
from django.http import HttpResponse
from django.templatetags.static import static
from django.template.loader import render_to_string


def send_pdf_link_email(request):
    recipient_email = "mbn.ahmadi78@gmail.com"
    
    # ساخت URL پویا با استفاده از دامنه فعلی (بعداً با IP سرور جایگزین می‌شود)
    # url_to_send = request.build_absolute_uri('/reports/')  # لینک به صفحه HTML
    url_to_send = "https://google.com"

    # domain = request.build_absolute_uri('/')[:-1]  # URL with domain e.g. https://example.com
    # pdf_image_url = domain + static('images/pdf.png')

    html_content = render_to_string('sendemail/email_template.html', {
        'url': url_to_send,
        'filename': 'Akam.pdf',  # نام ظاهری فایل PDF
        # 'pdf_image_url': pdf_image_url ,
    })

    # ارسال ایمیل
    send_mail(
        subject='report',
        message='لطفاً روی لینک زیر کلیک کنید برای مشاهده گزارش:',  # متن ساده
        from_email=None,  # از DEFAULT_FROM_EMAIL استفاده می‌شود
        recipient_list=[recipient_email],
        html_message=html_content,
    )

    return HttpResponse("ایمیل با موفقیت ارسال شد!")