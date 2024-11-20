# Dependencias

# BackEnd
- npm i -g @nestjs/cli
- npm install --save @nestjs/typeorm typeorm mysql2
- npm i --save class-validator class-transformer
- docker compose up -d

# FrontEnd
- npx create-react-app trello-frontend (Iniciar no frontend)
- npm install axios
- npm install cross-env --save-dev

# Importante
- Fazer o npm run start:dev no backend e deixe ligado
- Faça cd trello-frontend no bash
- Fazer npm start no frontend

//// Modificado "start": "react-scripts start", por "start": "cross-env PORT=3001 react-scripts start", no package.json


# Remover node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Instalar as dependências do ESLint
npm install eslint eslint-plugin-react eslint-config-react-app --save-dev

# Reinstalar todas as dependências
npm install
------------------------------------------------------

Instalação
Para instalar o ws, você pode usar o seguinte comando:

npm install ws

Para instalar o socket.io, utilize:

npm install socket.io
