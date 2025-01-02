FROM python:3.9-slim

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Copy xrx-core
COPY xrx-core/ /app/xrx-core/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app/ .

# Expose port
EXPOSE 8003

# Command to run the application
CMD ["python", "main.py"]