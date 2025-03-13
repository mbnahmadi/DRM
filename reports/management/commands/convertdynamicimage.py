from django.core.management.base import BaseCommand
from reports.scripts.convert_image import optimize_images_in_folder
import traceback


class Command(BaseCommand):
    help = 'convert image to webp'

    def handle(self, *args, **options):
        try:
            optimize_images_in_folder()
        except Exception as e:
            self.stderr.write(
            self.style.ERROR(f'exception in convert image:{e}')
            )
            
        
        self.stdout.write(
            self.style.SUCCESS('Convert image successfully!')
        )