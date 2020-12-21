import { useLinkProps } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Camara')}>
                    <View style={{ padding: 15, backgroundColor: 'red', borderRadius: 8 }}>
                        <Icon name="camera" color="white" size={45}></Icon>
                    </View>
                </TouchableOpacity>
                <View style={{ marginTop: 10 }}>
                    <Text>Escanear Pokémon</Text>
                </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Lista')}>
                    <View style={{ padding: 15, backgroundColor: 'red', borderRadius: 8 }}>
                        <Icon name="format-list-bulleted" color="white" size={45}></Icon>
                    </View>
                </TouchableOpacity>
                <View style={{ marginTop: 10 }}>
                    <Text>Pokémon Encontrados</Text>
                </View>
            </View>
        </View>
    );
}