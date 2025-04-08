FROM rasa/rasa:3.6.10-full

WORKDIR /app

COPY . .

CMD ["rasa", "run", "--enable-api", "--cors", "*", "--debug", "--host", "0.0.0.0"]
