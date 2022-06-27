FROM python:3.9

RUN mkdir /backend

WORKDIR /backend
COPY requirements.txt /backend/requirements.txt
COPY nsrdb3_dni.tif /backend/nsrdb3_dni.tif

EXPOSE 5001

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . .