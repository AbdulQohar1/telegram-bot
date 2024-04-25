require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const { TOKEN , SERVER_URL } = process.env;
const TELEGRAM_API = `http://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL+URI;

const app = express();
app.use(bodyParser.json());

const init = async () => {
  const  res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log(res.data);
};

app.post(URI, async (req, res) => {
  console.log(req.body);

  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;

  await axios.post(` ${TELEGRAM_API}/sendMessage` , {
    chat_id: chatId,
    text: text
  })
  return res.send();
})

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    app.listen(port, () => console.log(`Listening on port ${port}...`));

  } catch (error) {
    console.log(error)
  }

  await init();
};

start();


// Parsing request application requests/ json objects
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
// app.use(express.json());
// app.post("*", async (req , res) => {
//   console.log(req.body);
  
//   res.send('Hello post')

//   // const { message } = req.body;
//   // console.log('Request body:', req.body);

//   // if (!message || message.text.toLowerCase().indexOf("macro") < 0) {
//   //   return res.end();
//   // };
  
//   // axios.post(
//   //   "https://api.telegram.org/bot6942405195:AAHq_sDaahTTNJHdzGKwfBHmYfY2b9psZ6A/sendMessage",
//   //   {
//   //     chat_id: message.chat.id,
//   //     text: "Unknown"
//   //   }
//   // )
//   // .then(( response ) => {
//   //   console.log('Message posted!!');

//   //   res.end("Ok")
//   // })
//   // .catch( (err) => {
//   //   console.log("Error :", err);
//   //   res.end("Error :" + err);
//   // })
// });

// app.get("*", async (req , res) => {
//   res.send('Hello get ')
// })


// const port = process.env.PORT || 3000;
// const start = async () => {
//   try {
//     app.listen(port, () => console.log(`Listening on port ${port}...`));

//   } catch (error) {
//     console.log(error)
//   }
// };

// start();

// https://c355-105-112-212-247.ngrok-free.app -> http://localhost:4040 
/*
https://api.telegram.org/bot${MY_TOKEN}/${method}
*/