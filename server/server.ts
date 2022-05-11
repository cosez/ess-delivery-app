import express = require('express');
import bodyParser = require("body-parser");
import nodemailer = require("nodemailer")


import { RestaurantesService } from './src/restaurantes-service';
import { Restaurante } from './src/restaurante';

import { EmailService } from './src/email-service';

import { Status } from './src/status';
import { Status_service } from './src/status-service';
import { SingInData } from './src/signInData';
var app = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

var restauranteService: RestaurantesService = new RestaurantesService();
var statusService: Status_service = new Status_service();
const emailService: EmailService = new EmailService();

app.get('/restaurant', function(req, res){
  const restaurantes = restauranteService.get();
  res.send(JSON.stringify(restaurantes));
});

app.get('/restaurant/:cnpj', function(req, res){
  const cnpj = req.params.cnpj;
  const restaurante = restauranteService.getById(cnpj);
  if (restaurante) {
    res.send(restaurante);
  } else {
    res.status(404).send({ message: `Restaurante ${cnpj} could not be found`});
  }
});

app.delete('/restaurant/:email', function(req, res){
  const email = req.params.email;
  console.log(email);
  const restaurante = restauranteService.delete(email);
  if (restaurante) {
    res.send(restaurante);
  } else {
    res.status(404).send({ message: `Restaurante ${email} could not be found`});
  }
});

app.post('/restaurant', function(req: express.Request, res: express.Response){
  const restaurante: Restaurante = <Restaurante> req.body;
  try {
    const result = restauranteService.add(restaurante);
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(403).send({ message: "Restaurante list is full"});
    }
  } catch (err) {
    const {message} = err;
    if(message == 'Um restaurante já foi cadastrado com esse CNPJ')
      res.status(401).send({ message });
    else
      res.status(400).send({ message });
  }
});

app.put('/restaurant', function (req: express.Request, res: express.Response) {
  const restaurante: Restaurante = <Restaurante> req.body;
  const result = restauranteService.update(restaurante);
  if (result) {
    res.send(result);
  } else {
    res.status(404).send({ message: `Restaurante ${restaurante.cnpj} could not be found.`});
  }
})

app.put('/restaurante/status', function (req, res) {
  const status: Status = <Status>req.body;
  try {
    const result = statusService.updateStatus(status);
    if (result) {
      res.status(201).send(`Status list updated`);
    }
    else {
      res.status(409).send(`Status Id already in list`);
    }
  } catch (err) {
    const { message } = err;
    res.status(400).send({ message });
  }
});
app.get('/restaurant/status', function (req, res) {
  try {
    const result = statusService.returnStatusList();
    if (result) {
      res.status(200).send(result);
    }
    else {
      res.status(410).send(`empty Status list`);
    }
  } catch (err) {
    const { message } = err;
    res.status(400).send({ message });
  }
});
app.post('/restaurant/status/add', function (req, res) {
  const status:Status = <Status> req.body;
  try {
    const result = statusService.addStatus(status);
    if (result) {
      res.status(200).send(result);
    }
    else {
      res.status(406).send(`Id already present`);
    }
  } catch (err) {
    const { message } = err;
    res.status(400).send({ message });
  }
});
app.post('/restaurant/status/remove', function (req, res) {
  const status:Status = <Status> req.body;
  try {
    const result = statusService.removeStatus(status);
    if (result) {
      res.status(200).send(result);
    }
    else {
      res.status(410).send(`Id not found`);
    }
  } catch (err) {
    const { message } = err;
    res.status(400).send({ message });
  }
});
app.post('/pedido', function (req, res) {
  const order = { ...req.body };
  emailService.sendNewOrder(order);
  res.status(200).send(`Pedido de número ${order.id} enviado!`);
});

app.post('/restaurant/login', function(req: express.Request, res: express.Response){
  var signInData:SingInData = new SingInData(req.body.email, req.body.password);
  try {
    const result = restauranteService.authenticate(signInData);
    if (result){
      res.status(201).send(result);
    } else{
      res.status(401).send({message: "Falha no login. Senha ou email incorretos."})
    }
  } catch(err){
    const {message} = err;
    res.status(404).send({message});
  }
});

app.get('/pedido/notificacao', function (req, res) {
  const order = { ...req.query }
  const msg = (order.msg === "Confirmação") ? "Seu pedido foi confirmado!" : "Infelizmente seu pedido foi cancelado.";
  emailService.sendNotification(order, msg);
  res.sendStatus(200)
});
var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

function resetServer(): void {
  restauranteService.restaurantes = [];
}

export { app, server, closeServer, resetServer }