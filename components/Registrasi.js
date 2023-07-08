import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Registrasi = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [kataSandi, setKataSandi] = useState('');

  const handleRegistrasi = async () => {
    try {
      const response = await fetch('http://192.168.1.7:3000/api/registrasi' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          kataSandi: kataSandi,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        navigation.navigate('Login');
      } else {
        console.error('Pendaftaran gagal');
      }
    } catch (error) {
      console.error('Kesalahan saat menghubungi server:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/roti1.jpg')} style={styles.backgroundImage}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Daftar</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukan Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Masukan Kata Sandi"
            secureTextEntry
            value={kataSandi}
            onChangeText={setKataSandi}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegistrasi}>
            <Text style={styles.buttonText}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

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
    alignItems: 'center',
  },
  logo: {
    width: 240,
    height: 240,
    marginBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  formContainer: {
    width: '85%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3AFA36',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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

export default Registrasi;
