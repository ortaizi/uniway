# Use the official Rasa image as base
FROM rasa/rasa:3.6.10-full

# Set working directory inside the container
WORKDIR /app

# Copy the entire local Rasa directory to the container
COPY . .

# Define the command to run the Rasa server
CMD ["rasa", "run", "--enable-api", "--cors", "*", "--debug", "--port", "5005", "--host", "0.0.0.0"]
