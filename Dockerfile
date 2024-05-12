# Usar uma imagem base do Node.js (Alpine para menor tamanho de imagem)
FROM node:alpine3.19

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o arquivo 'package.json' e 'package-lock.json' (se disponível)
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install --production

# Copiar os outros arquivos do projeto para o diretório de trabalho
COPY . .

# Informar a porta que será exposta pelo contêiner
EXPOSE 3000

# Comando para executar a aplicação
CMD ["node", "src/app.js"]
