// Import React, useState, dan komponen dari react-native
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Definisikan komponen LoginScreen
const LoginPage = () => {
  // Dapatkan objek navigasi menggunakan useNavigation
  const navigation = useNavigation();

  // State untuk username dan password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Logika saat tombol Login ditekan
  const handleLogin = () => {
    const users = [
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'user1', password: 'user123', role: 'user' }
    ];
  
    const user = users.find((user) => user.username === username && user.password === password);
  
    if (user) {
      if (user.role === 'admin') {
        navigation.navigate('BerandaAdmin');
      } else if (user.role === 'user') {
        navigation.navigate('BerandaPengguna');
      }
    } else {
      Alert.alert('Error', 'Username atau password salah');
    }
  };
  
  // Tampilan komponen
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/roti1.jpg')}
        style={styles.backgroundImage}
      >
         <Image
            source={require('../assets/logo.png')}
            style={styles.logo}/>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Masuk</Text>
          <TextInput
            style={styles.input}
            placeholder="Nama"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Kata Sandi"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Masuk</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

// Stylesheet untuk komponen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  logoContainer: {
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
    marginBottom: 240,
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

export default LoginPage;
