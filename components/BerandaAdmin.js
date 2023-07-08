import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, TextInput, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default function BerandaPengguna({ navigation }) {
  const statusBarHeight = Constants.statusBarHeight;
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.buttonContainer1}>
        <TextInput
          style={styles.input}
          placeholder="Cari"
        />
      </View>
      <View style={styles.buttonContainer2}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('InputMenu')}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="cart-outline" size={24} color="white" />
            <Text style={styles.buttonText}>input Menu</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Riwayat')}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="time-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Riwayat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BerandaAdmin')}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="home-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DaftarMenu')}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="ios-pricetags-sharp" size={24} color="white" />
            <Text style={styles.buttonText}>Menu</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Tampilan')}
        >
          <View style={styles.buttonContent}>
            <MaterialIcons name="account-box" size={24} color="white" />
            <Text style={styles.buttonText}>Akun</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    paddingTop: Constants.statusBarHeight,
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 0,
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
  buttonContainer1: {
    alignItems: 'center',
    //flexDirection: 'row',
    width: '100%',
    height: 75,
    backgroundColor: '#4c1518',
  },
  buttonContainer2: {
    flexDirection: 'row',
    width: '100%',
    height: 75,
    backgroundColor: '#4c1518',
    justifyContent: 'space-between',

  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonText: {
    alignItems: 'center',
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5, // Jarak antara ikon dan teks
  },
  MenuBeranda: {
    height: 300,
    width: '100%',
    marginBottom: 0,
  },
  input: {
    borderWidth: 1,
    width: '75%',
    //weight: 50,
    borderColor: 'grey',
    borderRadius: 8,
    padding: 5,
    marginTop: 18,
    backgroundColor: 'white',
    borderColor: 'black',
    fontSize: 15,
    //fontWeight: 'bold',
  },

});
