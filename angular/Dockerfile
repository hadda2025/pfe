# Use official Node.js slim image as base for building
FROM node:20-alpine3.19 AS builder

# Set working directory
WORKDIR /app

# Install global Angular CLI
RUN npm install -g @angular/cli

# Copy package files
COPY package*.json ./
COPY angular.json ./

# Install dependencies with force
RUN npm install --force

# Copy source files
COPY . .

# Build the Angular application for development (without baseHref)
RUN ng build --configuration=development --base-href=/ || (echo "Build failed" && exit 1)

# Debug: Print dist folder contents after build
RUN ls -la dist/
RUN find dist/ -type f -name "*.png" -o -name "*.jpg" -o -name "*.svg" | head -10

# Production stage with Nginx
FROM nginx:alpine

# Copy built artifacts to nginx html directory
# This copies everything from the dist folder to the root of nginx
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]