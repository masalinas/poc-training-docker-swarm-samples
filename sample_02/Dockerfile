FROM nginx:latest

COPY ./html/index.html /usr/share/nginx/html/index.html

COPY start.sh /start.sh
RUN chmod +x /start.sh

# Set the entrypoint
ENTRYPOINT ["/start.sh"]