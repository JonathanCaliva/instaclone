const mongoose = require('mongoose')
const { ApolloServer} = require('apollo-server')
const typeDefs = require('./gql/schema')
const resolvers = require('./gql/resolver')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: '.env'});

mongoose.connect(
    process.env.BBDD,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:true,
        useCreateIndex:true,
    },
    (err,_)=>{
    if(err){
        console.log("error de conexion")
    }else{
        server();
    }
 }
);

function server(){
    const serverApollo = new ApolloServer({
        typeDefs,
        resolvers,
        context:({req})=>{
            const token = req.headers.authorization.split(' ')[1]
           
            if(token){
                try {
                    const user = jwt.verify(
                        token.replace('Bearer',""),
                        process.env.SECRET_KEY
                    );
                    return {
                        user
                    }
                } catch (error) {
                    console.log("####Error####")
                    console.log(error)
                    throw Error('Token invalido')
                }
            }
        }
    })
    serverApollo.listen().then(({url})=>{
        console.log("####################")
        console.log(`Servidor listo en la url ${url}`)
        console.log("####################")
    })
}