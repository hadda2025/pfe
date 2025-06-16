# Use official Node.js slim image as base
FROM node:20-alpine3.19 AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .env .env

# Install dependencies
COPY node_modules ./node_modules

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine3.19

# Set working directory
WORKDIR /app

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built artifacts from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./.env

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the server
CMD ["npm", "run", "start:prod"]