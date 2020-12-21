import React, { useEffect, useState, useRef } from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { AppApi } from '../services';

export default function CamaraScan({ navigation }) {

  const [loading, setLoading] = useState(false);
  const scanRef = useRef();

  function OnReadQR(e) {
    console.log('QR ESCANEADO =>', e.data);
    console.log(scanRef);
    setLoading(true);
    Alert.alert('Pokémon', 'Has visto un pokémon',
      [
        {
          text: 'Ver Detalle',
          onPress: () => {
            AppApi.GetAllPokemons().then((response) => {
              console.log('Pokemons =>', response.data.results);
              const AllPoke = response.data.results;
              var exist = false;
              var row = "";
              var cant = 0;
              AllPoke.forEach(p => {
                if (e.data == p.id_name) {
                  exist = true;
                  row = p.objectId;
                  cant = p.Cantidad;
                }
              });
              //Aumentar cantidad
              if (exist) {
                const jsonRequest = {
                  Estatus: true,
                  Cantidad: cant + 1
                }
                AppApi.UpdatePokemon(row, jsonRequest).then((response) => {
                  console.log(response);
                });
              }
              //Agregar pokemon
              else {
                AppApi.GetPokemonInfo(e.data).then((response) => {
                  console.log('Pokemon =>', response.data);
                  const Poke = response.data;
                  const jsonRequest = {
                    "id_name": e.data,
                    "Nombre": Poke.name,
                    "Image_url": Poke.sprites.other['official-artwork'].front_default
                  }
                  AppApi.AddPokemon(jsonRequest).then((response) => {
                    console.log(response);
                  });
                });
              }
            });
            navigation.navigate('Detalle', {
              pokemonId: e.data
            });
            setLoading(false);
            scanRef.current.reactivate();
          }
        }
      ],
      {
        cancelable: false
      }
    );
  }

  return (
    <View style={{ flex: 1, }}>
      <QRCodeScanner ref={scanRef} cameraStyle={{ width: '100%', }} showMarker markerStyle={{ borderColor: 'red' }} onRead={(e) => OnReadQR(e)} />
      {
        loading ?
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
          :
          null
      }
    </View>
  );
}