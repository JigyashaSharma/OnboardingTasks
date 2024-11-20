# Stage 1: Build React app (using .NET SDK and Node.js)
FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build

# Install Node.js and required dependencies (via apk)
RUN apk update && apk add --no-cache \
    nodejs \
    npm \
    bash \
    curl \
    libcurl \
    openssl \
    ca-certificates


# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire React project into the container
COPY . .

# Build the React app
RUN npm run build

# Use a smaller image to serve the static files (nginx)
FROM nginx:alpine

# Copy the build folder from the previous stage into the nginx server folder
# Vite outputs to the dist folder, not build
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
