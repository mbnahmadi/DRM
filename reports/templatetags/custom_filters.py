from django import template
import datetime


register = template.Library()

@register.filter
def get_hour(value):
    return value.split(':')[0]


@register.filter
def get_year(value):
    x = datetime.datetime.now()
    return f"{value}-{x.year}"



@register.filter
def next_date(data, current_item):
    index = data.index(current_item)
    if index + 1 < len(data):
        return data[index + 1].date
    return None