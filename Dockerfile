# Usando uma imagem base do Node.js
FROM node:16-slim

# Instalando dependências necessárias
RUN apt-get update && \
    apt-get install -y \
    curl \
    libaio1 \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Instalar dependências do Node.js
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta que o aplicativo irá utilizar
EXPOSE 8082

# Definir o comando para rodar o aplicativo Node.js
CMD npm run dev