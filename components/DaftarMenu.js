import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const DaftarMenu = ({navigation}) => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://192.168.1.7:3000/api/menu');
        const data = await response.json();

        if (response.ok) {
          setMenuData(data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Gagal mengambil data menu:', error);
        alert('Gagal mengambil data menu');
      }
    };

    fetchMenu();
  }, []);

  const renderMenu = ({ item }) => {
    const renderImage = `data:${item.image};base64,${item.image}`;

    return (
      <View style={styles.menuItem}>
        <Image source={{ uri: renderImage }} style={styles.gambarMenu} />
        <View style={styles.menuDetails}>
          <Text style={styles.daftarMenu}>{item.nama}</Text>
          <Text style={styles.hargaMenu}>{item.harga}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer1}>
      </View>
      <FlatList
        data={menuData}
        keyExtractor={(item) => item._id}
        renderItem={renderMenu}
        numColumns={2}
        contentContainerStyle={styles.menuList}
      />
      <View style={styles.buttonContainer2}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MenuList')}
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
          onPress={() => navigation.navigate('Promo')}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="ios-pricetags-sharp" size={24} color="white" />
            <Text style={styles.buttonText}>Promo</Text>
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
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    paddingTop: Constants.statusBarHeight,
  },
  menuList: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 50,
  },
  menuItem: {
    flexDirection: 'column',
    //alignItems: 'center',
    marginBottom: 10,
    width: '50%',
  },
  gambarMenu: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 8,
  },
  menuDetails: {
    flex: 1,
    //alignItems: 'center',
  },
  daftarMenu: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    
  },
  hargaMenu: {
    fontSize: 16,
    color: '#888',
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

});
export default DaftarMenu;
