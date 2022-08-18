const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.json({ message: "Hello Cypress Discovery" })
});

app.get("/avengers", function (req, res) {
  var avengers = [
    "Tony Stark",
    "Clint Barton",
    "Natasha Romanoff",
    "Steve Rogers",
  ];
  return res.json({ data: avengers })
});

app.get("/cnh", function (req, res) {
  const age = req.query.age;

  if (!age) {
    return res.json({message: 'Age is a required field!'})
  }
  
  var ageNum = parseInt(age);
  if (ageNum >= 18) {
    return res.json({message: 'Ok, você pode tirar a sua CNH!'})
  } else if (ageNum > 4) {
    res.json({message: 'Você é menor de idade, por enquanto sugiro andar de bike!'})
  } else {
   return res.json({message: 'Melhor você tomar leite!!!!'})
  }
});

app.listen(3000);
