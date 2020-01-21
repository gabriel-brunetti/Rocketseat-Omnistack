const Dev = require('../models/Dev');
const parseStringAsArray = require('../utiils/parseStringsAsArray');

module.exports = {
    async index(request, response){
        const { latitude, longitude, techs} = request.query;
        // buscar todos os devs num raio de 10 kms
        const techsArray = parseStringAsArray(techs);
        // filtrar por tecnologias
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({ devs});
    }
}