FROM nginx:latest as prod
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
