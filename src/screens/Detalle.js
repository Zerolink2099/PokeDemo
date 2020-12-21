import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppApi } from '../services';

export default function DetallePokemon({ route }) {

  const { pokemonId } = route.params;

  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(false);

  const getPokeInfo = () => {
    AppApi.GetPokemonInfo(pokemonId).then((response) => {
      console.log('Pokemon =>', response.data);
      setPokemon(response.data);
      setLoading(true);
    });
  }

  useEffect(() => {
    getPokeInfo();
  }, []);

  return (
    loading ?
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 15 }}>
        <Image style={{ width: 200, height: 200, resizeMode: 'cover' }} source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}></Image>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{pokemon.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text>( </Text>
          {pokemon.types.map((t, i) => {
            return (
              <Text key={i}>{t.type.name} </Text>
            )
          })}
          <Text>)</Text>
        </View>
        <View style={{ flex: 1, width: '100%', padding: 15 }}>
          {pokemon.stats.map((s, i) => {
            return (
              <View key={i} style={{ flexDirection: 'row', paddingVertical: 15, borderBottomWidth: 1, borderTopWidth: i == 0 ? 1 : 0 }}>
                <Text style={{ flex: 1 }} >{s.stat.name} </Text>
                <Text style={{ flex: 1 }} >{s.base_stat} </Text>
              </View>
            )
          })}
        </View>
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