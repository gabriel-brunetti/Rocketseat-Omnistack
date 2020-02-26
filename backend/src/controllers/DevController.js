const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    // Listar todos os devs
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },
    // Cadastrar um dev
    async store(request, response){
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            // continuar
            const { name = login, avatar_url, bio} = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }
    
        return response.json(dev);
    },
    // Atualizar um dev (código próprio)
    async update(request, response){
        const { name, techs, bio} = request.body
        // validando a requisição
        if(request.body = {}){
            return response.status(400).send({
                message: "O conteúdo de Dev não pode ser vazio"
            });
        }

        // encontrando um dev e atualizando-o com o request body
        const techsArray = parseStringAsArray(techs);
        const search =(request.params.githubUsername);
        let dev = await Dev.find({
            github_username: {
                $in: search
            }
        })

        dev = await Dev.update({
            name,
            techs: techsArray,
            bio
        })

        return response.json(dev);

    },
    // Deletar um dev (código próprio)
    async destroy(request, response){
        const user =(request.params.githubUsername);
        Dev.deleteOne({
            // delete one preciso passar uma condição para a buscar
            // é preciso esse function (err) {} !!!
            github_username: user
        }, function (err) {});

        response.send({
            message: "Usuário deletado"
        })
    },
    // Mostar UM dev (código proprio)
    async show(request, response){
        const search =(request.params.githubUsername);
        let dev = await Dev.find({
            github_username: {
                $in: search
            }
        })

        if (dev = []){
            return response.status(404).send({
                message: "Nenhum dev foi encontrado com o username" + request.params.githubUsername
            });
        } else {
            return response.json(dev);
        }

    },
};