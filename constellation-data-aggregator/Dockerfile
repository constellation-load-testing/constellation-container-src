FROM --platform=linux/amd64 telegraf:latest

COPY . .

EXPOSE 8186

CMD ["telegraf", "--config", "./telegraf.conf"]
