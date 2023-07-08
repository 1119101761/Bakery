import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, } from 'react-native';

export default function TampilanAwal({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/roti1.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
            >
            <Text style={styles.buttonText}>Masuk</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Registrasi')}
          >
            <Text style={styles.buttonText}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center'
  },
  logo: {
    width: 240,
    height: 240,
  },

  buttonContainer: {
    flexDirection: 'row',
    width: '70%',
    alignSelf: 'center',
    marginTop: 250,
  },
  button: {
    flex: 1,
    height: '70%',
    backgroundColor: '#3AFA36',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
  },
});
