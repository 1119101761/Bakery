import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const TampilanPromo = ({ navigation }) => {
  const [promoData, setPromoData] = useState([]);
  const statusBarHeight = Constants.statusBarHeight;
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);

    // Lakukan logika pencarian berdasarkan teks
    const results = promoData.filter(item => item.nama.toLowerCase().includes(text.toLowerCase()));
    setSearchResults(results);
  };

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const response = await fetch('http://192.168.1.7:3000/api/promo');
        const data = await response.json();

        if (response.ok) {
          setPromoData(data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Gagal mengambil data promo:', error);
        alert('Gagal mengambil data promo');
      }
    };

    fetchPromo();
  }, []);

  const renderPromo = ({ item }) => {
    const renderImage = `data:${item.image};base64,${item.image}`;

    return (
      <View style={styles.promoItem}>
        <Image source={{ uri: renderImage }} style={styles.gambarPromo} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer1}>
        <TextInput
          style={styles.input}
          placeholder="Cari"
          value={searchText}
          onChangeText={text => handleSearch(text)}
        />
      </View>
      <View>
        {searchResults.map(item => (
          <Text key={item.id}>{item.nama}</Text>
        ))}
      </View>
      <FlatList
        data={promoData}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderPromo}
        //numColumns={2}
        contentContainerStyle={styles.promoList}
      />
      <View style={styles.buttonContainer2}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DaftarMenu')}
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
    paddingTop: Constants.statusBarHeight,
  },
  input: {
    borderWidth: 1,
    width: '75%',
    borderColor: 'grey',
    borderRadius: 8,
    padding: 5,
    marginTop: 18,
    backgroundColor: 'white',
    borderColor: 'black',
    fontSize: 15,
  },
  promoList: {
    paddingVertical: 5,
    paddingHorizontal: 7.5,
    alignContent: 'center',
    alignItems: 'flex-start',
  },
  promoItem: {
    flexDirection: 'column',
    marginBottom: 5,
    marginRight: 5,
    width: 335,
    borderWidth: 0.1,
    backgroundColor: 'white',
    borderColor: '#eef0ef',
  },
  gambarPromo: {
    width: '100%',
    height: 200,
  },
  buttonContainer1: {
    alignItems: 'center',
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
    marginTop: 5,
  },
});

export default TampilanPromo;
