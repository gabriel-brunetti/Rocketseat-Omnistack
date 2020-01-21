const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;

// Tipos de Paramentos
// Query Params:
    // METODO GET
    // req.query (filtos, ordenação, paginação, ...)
    // são incorporados na URL, passar info pela URL
// Route Params:
    // METODOS PUTS E DELETE
    // request.params (Identificar um recurso na alteração ou remoção)
// Body:
    // METODO PUT E POST
    // request.body (São dados para criação ou alteração de um registro)