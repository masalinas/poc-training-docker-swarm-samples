#!/bin/bash

# Get the node hostname (can use docker hostname or Docker Swarm API)
export NODE_NAME=$(hostname)

# Substitute the node name in the default NGINX HTML page (optional)
sed -i "s/{{NODE_NAME}}/$NODE_NAME/g" /usr/share/nginx/html/index.html

# Start NGINX
exec nginx -g "daemon off;"