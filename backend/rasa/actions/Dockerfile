FROM rasa/rasa-sdk:3.6.2

ENTRYPOINT []


WORKDIR /app/actions

COPY . .

USER root
RUN pip install --no-cache-dir -r requirements.txt || true

CMD ["rasa", "run", "actions"]
