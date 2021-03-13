const express = require('express');
const app = express();
const config = require('./config/config');
const mongoose = require('mongoose');
const rotas = require('./Routes/routes');

mongoose.connect(config.bd_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((s,e)=>{
    console.log('Conectou no bd com sucesso'+ s)
}).catch((err)=>{
    console.log('Erro'+ err)
});
mongoose.set('useCreateIndex',true);

mongoose.connection.on('error',(err)=>{
    console.log('erro na conexao' + err);
});

mongoose.connection.on('disconnected',()=>{
    console.log('Aplicação desconectada');
});

mongoose.connection.on('connected',()=>{
    console.log('Aplicação conectada');
});


app.use(express.json());

app.use((req, res, next) => {
  app.use(rotas);
  next();
});


app.listen(8080, () => {
    console.log('servidor rodando');

});

module.exports = app;