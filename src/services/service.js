import apisauce from 'apisauce';

const create = () => {

    const api = apisauce.create({
        baseURL: 'https://pokeapi.co/api/v2/',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });

    const apiBack = apisauce.create({
        baseURL: 'https://parseapi.back4app.com/classes/',
        timeout: 10000,
        headers: {
            'X-Parse-Application-Id': 'HBvL7kx718JKHn5esAARHNkHSABpR10cVSF6twCF',
            'X-Parse-REST-API-Key': '3vpym78TJPOL77QEzRXBdm36KZ94TSHVUYJlaJVb',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });

    const GetPokemonInfo = (pokemon_id) => api.get(`pokemon/${pokemon_id}`, null);
    const GetAllPokemons = () => apiBack.get(`Pokemon`, null);
    const AddPokemon = (jsonBody) => apiBack.post(`Pokemon`, jsonBody);
    const UpdatePokemon = (row_id, jsonBody) => apiBack.put(`Pokemon/${row_id}`, jsonBody);

    return {
        GetPokemonInfo,
        GetAllPokemons,
        AddPokemon,
        UpdatePokemon

    };
}

export default { create };