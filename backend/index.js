// chama a biblioteca express
const express = require('express');

const app = express();

// request -> o que vem do front end/ response é como vamos devolver
// nossa resposta para o cliente
app.get('/', (request, response) => {
    return response.json({message: 'Hello OmniStack'});
});
// define a porta da aplicação
app.listen(3333);