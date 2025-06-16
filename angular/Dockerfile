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

# Print dist folder contents before and after build for debugging
RUN ls -la

# Build the Angular application with verbose output
RUN npm run build-prod || (echo "Build failed" && ls -la dist && exit 1)

# Print dist folder contents after build
RUN ls -la dist

# Production stage with Nginx
FROM nginx:alpine

# Create directory structure
RUN mkdir -p /usr/share/nginx/html/demos/admin-templates/gradient-able/angular/free

# Copy built artifacts 
# Use wildcard to handle potential naming variations
COPY --from=builder /app/dist*/*/ /usr/share/nginx/html/demos/admin-templates/gradient-able/angular/free

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]