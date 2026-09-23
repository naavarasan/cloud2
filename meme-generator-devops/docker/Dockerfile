# Use lightweight Nginx alpine image as the base
FROM nginx:alpine

# Copy the static application files into Nginx's web directory
# Assuming the build context is the root directory 'meme-generator-devops'
COPY app/ /usr/share/nginx/html/

# Expose port 80 for the web server
EXPOSE 80

# Nginx starts automatically, no CMD needed
