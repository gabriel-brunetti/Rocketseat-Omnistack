const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// mostar um Dev
routes.get('/devs/:githubUsername', DevController.show)
// mostrando os Devs
routes.get('/devs', DevController.index);
// salvando um Dev
routes.post('/devs', DevController.store);
// atualizando um Dev
routes.put('/devs/:githubUsername', DevController.update);
// deletando um Dev
routes.delete('/devs/:githubUsername', DevController.destroy);

// Pesquisar Devs (mobile)
routes.get('/search', SearchController.index);

module.exports = routes;