/*Primeiro passo é criar o servidor e certificar que deu certo*/
const express = require('express')
const cors = require('cors')
const app = express()
const bcrypt = require('bcrypt')
///////////////////////////Conexão com o Banco de Dados///////////////////////////////
const {Client} = require('pg')
const connectingString = 'postgresql://postgres:senha123@localhost:5432/login_app'
const dbClient = new Client({connectionString: connectingString });
dbClient.connect()
    .then(() => {
    console.log('Conectado com sucesso!')
    })
    .catch((err) => {
        console.log('Falha ao conectar!', err.stack)
    })
/////////////////////////////////////////////////////////////////////////////////////

app.use(express.json()) /*entender o que esta vindo do front-end*/
app.use(cors())

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})

app.post('/login', async (req, res) => {
    try{
        const consulta = await dbClient.query('SELECT * FROM users WHERE gmail = $1', [req.body.gmail])
        if(consulta.rows.length > 0){ //existe o usuário
                
            const consultaSenha = await bcrypt.compare(req.body.senha, consulta.rows[0].senha)

            if(consultaSenha){

                return res.status(200).json({success: true, message: 'Login realizado com sucesso!'})
            }
            else{   
                return res.status(401).json({success: false, message: 'Senha Incorreta.'})
            }
        }
        else{
            return res.status(401).json({success: false, message: 'Usuario não encontrado.'})
        }

    }catch(err){
        return res.json({success: false, message: 'Erro interno do servidor!'})
    }
})

app.post('/cadastro', async (req, res) => {

    try{
        const consulta = await dbClient.query('SELECT * FROM users WHERE gmail = $1', [req.body.gmail])
        if(consulta.rows.length > 0){ //Usuário ja cadastrado
            return res.status(401).json({success: false, message: 'Usuário já cadastrado.'})
        }

        senhaCriptografada = await bcrypt.hash(req.body.senha, 10)
        const adicionar = await dbClient.query('INSERT INTO users (gmail, senha) VALUES ($1, $2)', [req.body.gmail, senhaCriptografada])
        return res.status(200).json({success: true, message: 'Cadastro Realizado com sucesso!'})

    }catch(err){
        return res.json({success: false, message: 'Erro interno do servidor!'})
    }
})