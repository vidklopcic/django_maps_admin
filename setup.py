import os
from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
README = open(os.path.join(here, 'README.rst')).read()


setup(
    name='django-maps-admin',
    version='0.1',
    packages=find_packages(),
    include_package_data=True,
    description='Maps admin',
    long_description=README,
    author='Vid Klopcic',
    author_email='klopcic.vid@gmail.com',
    url='https://github.com/vidklopic/django_maps_admin',
    license='MIT',
    install_requires=[
        'Django>=2.1',
    ]
)
