import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppApi } from '../services';

export default function ListaPokemon({ navigation }) {

  const [allpokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllPokemons = () => {
    AppApi.GetAllPokemons().then((response) => {
      console.log('Pokemons =>', response.data.results);
      var PokeTrue = [];
      response.data.results.forEach(p => {
        if (p.Estatus)
          PokeTrue.push(p);
      });
      setAllPokemons(PokeTrue);
      setLoading(true);
    });
  }

  useEffect(() => {
    getAllPokemons();
  }, []);

  const dellPokemon = (id_poke) => {
    AppApi.GetAllPokemons().then((response) => {
      console.log('Pokemons =>', response.data.results);
      const AllPoke = response.data.results;
      var row = "";
      AllPoke.forEach(p => {
        if (id_poke == p.id_name) {
          row = p.objectId;
        }
      });
      const jsonRequest = {
        Estatus: false,
        Cantidad: 0
      }
      AppApi.UpdatePokemon(row, jsonRequest).then((response) => {
        getAllPokemons();
      });
    });

  }

  return (
    loading ?
      allpokemons.length > 0 ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 15 }}>
          {
            allpokemons.map((p, i) => {
              var nombre = p.Nombre.charAt(0).toUpperCase().concat(p.Nombre.slice(1));
              return (
                <View key={i} style={{ padding: 15, borderColor: 'red', borderWidth: 1, borderRadius: 8, width: '100%', marginBottom: 10 }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('Detalle', { pokemonId: p.id_name })}>
                    <Image style={{ width: 50, height: 50, resizeMode: 'cover', }} source={{ uri: p.Image_url }}></Image>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 20, paddingLeft: 10 }}>{nombre}</Text>
                      <Text style={{ fontSize: 14, paddingLeft: 10 }}>Encontrados: {p.Cantidad}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { dellPokemon(p.id_name); }}>
                      <Icon name="trash-can-outline" color="black" size={45}></Icon>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              );
            })
          }
        </View>
        :
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 15 }}>
          <Text>Aún no has encontrado algún Pokémon</Text>
        </View>
      :
      <View style={{
        backgroundColor: 'rgba(0,0,0,.7)',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator color='white'></ActivityIndicator>
      </View>
  );
}