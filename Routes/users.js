const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const createUserToken = (userID) => {
    return jwt.sign({id:userID},config.api_key,{ expiresIn:'7d'});
    }


const Users = require('../models/user');

router.get('/',async(req, res) => {
 try{
const users = await Users.find();
return res.status(200).send(users);
 } catch(err) {
    if(err) return res.status(401).send({err:"Erro na listagem de usuarios"});
}
});
/*
router.get('/', (req, res) => {
Users.find({},(err,data)=> {
    if(err) return res.send({err:"Erro na listagem de usuarios"});
return res.send(data);
});

});
*/
// async
router.post('/create', async (req, res) => {
    const{email,password} = req.body;
if(!email || !password)return res.send({error:'Dados inválidos'});
// se não voltar entra no try catch
try {
    if(await Users.findOne({email})) return res.status(404).send({error:'Usuários já cadastrado'});
    const user = await Users.create(req.body);
    user.password = undefined;
    return res.status(200).send({user,token:createUserToken(user.id)});

} catch(error) {
    if(error) return res.send({error:"Erro no cadastro o usuario"});

}

});
/*
router.post('/create', (req, res) => {
    const{email,password} = req.body;
if(!email || !password)return res.send({error:'Dados inválidos'});
// Se o user já foi cadastrado
Users.findOne({email},(error,data)=>{
    if(data)return res.send({error:'Usuários já cadastrado'});
    if(error) return res.send({error:"Erro na consulta"});
Users.create(req.body,(error,data)=>{
    if(error) return res.send({error:"Erro no cadatro o usuario"});
    return res.send(data);

});
});
});
*/
 // auth
router.post('/auth', async (req, res) => {
    const{email,password} = req.body;
if(!email || !password)return res.send({error:'Dados inválidos'});
try{
    const user = await Users.findOne({email}).select('+password');
    if(!user) return res.status(404).send({error:'Usuário não encontrado'});
    const pass_ok = await bcrypt.compare(password,user.password);
    if(!pass_ok)res.status(401).send({error:'Erro de login, verifique seus dados'});
    user.password = undefined;
    return res.send({user, token:createUserToken(user.id)});
} catch(err) {
    if(err) return res.status(500).send({err:"Erro na consulta do usuário" + err});
}

});



module.exports = router;