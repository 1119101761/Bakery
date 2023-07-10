import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const DaftarMenuUser = ({ navigation }) => {
  const [menuData, setMenuData] = useState([]);
  const statusBarHeight = Constants.statusBarHeight;
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);

    // Lakukan logika pencarian berdasarkan teks
    const results = data.filter(item => item.nama.toLowerCase().includes(text.toLowerCase()));
    setSearchResults(results);
  };

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
    const formattedPrice = item.harga.toLocaleString('id-ID');

    return (
      <View style={styles.menuItem}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: renderImage }} style={styles.gambarMenu} />
        </View>
        <View style={styles.detailMenu}>
          <Text style={styles.namaMenu}>{item.nama}</Text>
          <Text style={styles.hargaMenu}>Rp. {formattedPrice}</Text>
        </View>
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
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={handleSearch}
        />
      </View>
      <View>
        {searchResults.map(item => (
          <Text key={item.id}>{item.nama}</Text>
        ))}
      </View>
      <FlatList
        data={menuData}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderMenu}
        numColumns={2}
        contentContainerStyle={styles.menuList}
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
    backgroundColor: '#eef0ef',
    paddingTop: Constants.statusBarHeight,
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
  menuList: {
    paddingVertical: 5,
    paddingHorizontal: 7.5,
    alignContent: 'center',
    alignItems: 'flex-start',
  },
  menuItem: {
    flexDirection: 'column',
    marginBottom: 5,
    marginRight: 5,
    width: 165,
    borderWidth: 0.1,
    backgroundColor: 'white',
    borderColor: '#eef0ef',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gambarMenu: {
    width: '100%',
    height: '100%',
  },
  detailMenu: {
    alignItems: 'flex-start',
    marginTop: 1,
  },
  namaMenu: {
    fontSize: 15,
    marginBottom: 5,
  },
  hargaMenu: {
    fontSize: 15,
    color: 'red',
    alignItems: 'flex-start',
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

export default DaftarMenuUser;
