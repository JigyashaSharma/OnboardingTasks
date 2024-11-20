# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory inside the container
WORKDIR /src

# Copy the .csproj file and restore any dependencies (via dotnet restore)
COPY ["sdonboarding.Server.csproj", "./"]
RUN dotnet restore "sdonboarding.Server.csproj"

# Set the working directory to the project folder
WORKDIR "/src"

# Copy the rest of the application
COPY . ./ 

# Build the application
RUN dotnet build "sdonboarding.Server.csproj" -c Release -o /app/build

# Publish the application to the /app/publish folder
FROM build AS publish
RUN dotnet publish "sdonboarding.Server.csproj" -c Release -o /app/publish

# Use the ASP.NET Core runtime image to run the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443  
# Expose HTTPS port

# Install OpenSSL to generate the self-signed certificate
RUN apt-get update && apt-get install -y openssl

# Create the /https directory where the certificate and key will be stored
RUN mkdir /https

# Generate a self-signed SSL certificate (use your own values for password, CN, etc.)
RUN openssl genpkey -algorithm RSA -out /https/private.key -pkeyopt rsa_keygen_bits:2048 && \
    openssl req -new -key /https/private.key -out /https/csr.csr -subj "/CN=localhost" && \
    openssl x509 -req -in /https/csr.csr -signkey /https/private.key -out /https/certificate.crt

# Combine private key and certificate into a .pfx file
RUN openssl pkcs12 -export -out /https/certificate.pfx -inkey /https/private.key -in /https/certificate.crt -password pass:your_certificate_password

# Copy the published app from the previous stage
COPY --from=publish /app/publish ./

# Set environment variables for SSL certificate
ENV ASPNETCORE_Kestrel__Certificates__Default__Password="your_certificate_password"
ENV ASPNETCORE_Kestrel__Certificates__Default__Path="/https/certificate.pfx"

# Set the entry point for the application
ENTRYPOINT ["dotnet", "sdonboarding.Server.dll"]
