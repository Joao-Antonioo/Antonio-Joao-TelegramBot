- Bot de Atendimento do Telegram

Este projeto é um bot de atendimento para o aplicativo Telegram. Ele foi projetado para responder automaticamente às mensagens dos usuários com base no horário em que a mensagem foi enviada.

-- Funcionalidades

- Durante o horário comercial (09:00 às 18:00), o bot responde com uma mensagem de boas-vindas e fornece o link para o site da empresa.
- Fora do horário comercial, o bot solicita o e-mail do usuário para que a equipe de atendimento possa entrar em contato posteriormente. O e-mail do usuário é armazenado em um banco de dados SQLite usando o ORM Prisma.

-- Instruções de como executar

1. Clone o repositório.
2. Instale as dependências usando o comando `npm install`.
3. Coloque o token do bot no arquivo `.env`.
4. Execute o bot com `node src/bot_telegram.js`.

-- Dependências

- Prisma
- node-telegram-bot-api
- dotenv
