FROM rasa/rasa-sdk:3.6.2

WORKDIR /app/actions

COPY . .

RUN pip install --no-cache-dir --user -r requirements.txt || true

CMD ["rasa", "run", "actions"]
