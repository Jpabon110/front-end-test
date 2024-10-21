# 1. Usamos una imagen base oficial de Node.js para construir la aplicación
FROM node:18-alpine AS build

# 2. Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos los archivos package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# 4. Instalamos las dependencias de la aplicación
RUN npm install

# 5. Copiamos todo el contenido del proyecto al contenedor
COPY . .

# 6. Construimos la aplicación para producción
RUN npm run build --prod

# 7. Usamos una imagen base oficial de NGINX para servir la aplicación
FROM nginx:alpine

# 8. Copiamos los archivos generados por Angular en la carpeta /dist al directorio de NGINX
COPY --from=build /app/dist/tu-proyecto-angular /usr/share/nginx/html

# 9. Exponemos el puerto 80 para poder acceder a la aplicación
EXPOSE 80

# 10. Arrancamos NGINX (el contenedor se mantendrá ejecutando con NGINX activo)
CMD ["nginx", "-g", "daemon off;"]
