const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

let awaitingEmail = new Set();

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;
  const date = new Date();

  if (date.getHours() >= 9 && date.getHours() <= 18) {
    bot.sendMessage(chatId, 'Bem-vindo à nossa loja virtual. Estamos aqui para ajudá-lo. Visite nosso site para obter mais informações: https://faesa.br');
  } else {
    if (awaitingEmail.has(chatId) && message.includes('@')) {
      await saveEmail(message);
      bot.sendMessage(chatId, 'Obrigado por informar seu e-mail! Nossa equipe entrará em contato com você o mais breve possível.');
      awaitingEmail.delete(chatId);
    } else if (awaitingEmail.has(chatId)) {
      bot.sendMessage(chatId, 'Por favor, compartilhe seu e-mail para que possamos entrar em contato. Suas informações estão seguras conosco.');
    } else {
      bot.sendMessage(chatId, 'Que pena! No momento, nossa equipe está de folga para recarregar as energias e te atender da melhor forma possível. Voltamos amanhã, das 9h às 18h. Para que não perca tempo, deixe seu e-mail e entraremos em contato em breve!.');
      awaitingEmail.add(chatId);
    }
  }
});

async function saveEmail(email) {
  try {
    await prisma.emailContato.create({
      data: {
        email: email,
      },
    });
    console.log('E-mail salvo com sucesso! Logo entraremos em contato com você.');
  } catch (error) {
    console.error(', Erro ao salvar o e-mail:', error);
  }
}
