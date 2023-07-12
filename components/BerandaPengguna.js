import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, TextInput, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
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
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image style={styles.MenuBeranda} source={require('../assets/RotiMalamKerak.jpg')} />
        <Image style={styles.MenuBeranda} source={require('../assets/RotiCroicant.jpg')} />
        <Image style={styles.MenuBeranda} source={require('../assets/PancakeBluberry.jpg')} />
        <Image style={styles.MenuBeranda} source={require('../assets/Sandwitch.jpg')} />
        <Text style={styles.titleContainer}>QA BAKERY</Text>
        <Text style={styles.paragrafContainer}>Selamat datang di QA Bakery!
          Di Dunia Bakery, kami memperkenalkan kepada Anda usaha toko bakery kami yang berdedikasi untuk menyajikan kualitas terbaik dalam roti dan produk roti lainnya. Dengan tampilan teks yang menarik, kami mengajak Anda untuk menjelajahi dan merasakan kelezatan yang kami tawarkan.</Text>
        <Text style={styles.paragrafContainer}>Kami adalah sebuah toko bakery yang berkomitmen untuk menghadirkan pengalaman roti yang tak tertandingi. Dari roti segar yang dipanggang dengan hati-hati hingga kue-kue manis yang menggoda, setiap produk kami dibuat dengan bahan-bahan berkualitas tinggi dan keahlian tangan yang terampil
        </Text> 
        <Text style={styles.paragrafContainer}>Kami percaya bahwa teknologi dapat menjadi alat yang kuat dalam mencapai tujuan tersebut. Dengan Aplikasi Toko Roti Sederhana, kami memadukan keahlian dalam pengembangan perangkat lunak dan pengetahuan tentang industri roti untuk menciptakan sebuah platform yang menghubungkan pemilik toko roti dengan pelanggan mereka dengan cara yang efisien dan efektif.</Text>
      </ScrollView>
      <View style={styles.buttonContainer2}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DaftarMenuUser')}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="cart-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Belanja</Text>
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
          onPress={() => navigation.navigate('BerandaPengguna')}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="home-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TampilanPromo')}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="ios-pricetags-sharp" size={24} color="white" />
            <Text style={styles.buttonText}>Promo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TampilanAwal')}
        >
          <View style={styles.buttonContent}>
          <Entypo name="log-out" size={24} color="white" />
            <Text style={styles.buttonText}>Keluar</Text>
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
    fontSize: 13,
    fontWeight: 'bold',
    color: '#3C3D64',
    marginBottom: 10,
    marginHorizontal: 30,
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
