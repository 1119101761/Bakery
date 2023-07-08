import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function BerandaPengguna({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Pengguna')}
        >
          <Ionicons name="home-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BerandaPengguna')}
        >
          <Ionicons name="cart-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Belanja</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Riwayat')}
        >
          <Ionicons name="time-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Riwayat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Riwayat')}
        >
          <MaterialIcons name="account-box" size={24} color="white" />
          <Text style={styles.buttonText}>Akun</Text>
        </TouchableOpacity>
      </View>
      <Image style={styles.logo} source={require('../assets/villa.jpeg')} />
      <Text style={styles.titleContainer}>Title Pertama</Text>
      <Text style={styles.paragrafContainer}>Paragraf pertama</Text>
      <Text style={styles.titleContainer}>Title Kedua</Text>
      <Text style={styles.paragrafContainer}>Paragraf kedua</Text>
      <Text style={styles.titleContainer}>Title Ketiga</Text>
      <Text style={styles.paragrafContainer}>Paragraf ketiga</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    paddingVertical: 30,
  },
  titleContainer: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3C3D64',
    marginBottom: 10,
    borderRadius: 10,
    borderColor: 'white',
    margin: 10,
  },
  paragrafContainer: {
    fontSize: 12,
    color: '#3C3D64',
    marginBottom: 10,
    textAlign: 'justify',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 70,
    borderWidth: 0,
    backgroundColor: '#3C3D64',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  logo: {
    height: 140,
    width: '100%',
  },
});
