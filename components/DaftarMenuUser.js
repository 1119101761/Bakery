import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialIcons, Entypo, Octicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const DaftarMenuUser = ({ navigation }) => {
  const [menuData, setMenuData] = useState([]);
  const statusBarHeight = Constants.statusBarHeight;
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleSearch = (text) => {
    setSearchText(text);

    // Lakukan logika pencarian berdasarkan teks
    const results = menuData.filter(item => item.nama.toLowerCase().includes(text.toLowerCase()));
    setSearchResults(results);
  };

  const openOrderPopup = (menu) => {
    setSelectedMenu(menu);
    setQuantity(1);
  };

  const submitOrder = () => {
    if (!selectedMenu || !selectedMenu._id) {
      Alert.alert('Error', 'Silakan pilih menu sebelum melakukan pemesanan');
      return;
    }

    const order = {
      menuId: selectedMenu._id,
      quantity: quantity,
    };

    fetch('http://192.168.1.7:3000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert('Sukses', 'Pesanan berhasil dikirim!');
          setSelectedMenu(null);
          setQuantity(1);
        } else {
          Alert.alert('Error', 'Gagal mengirim pesanan. Silakan coba lagi.');
        }
      })
      .catch((error) => {
        console.error('Gagal mengirim pesanan:', error);
        Alert.alert('Error', 'Gagal mengirim pesanan. Silakan coba lagi.');
      });
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
          <TouchableOpacity onPress={() => openOrderPopup(item)}>
            <Text style={styles.pesanButton}>Pesan</Text>
          </TouchableOpacity>
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
          onChangeText={text => handleSearch(text)}
        />
        <TouchableOpacity onPress={() => navigation.navigate('KeranjangBelanja')}>
          <View style={styles.buttonContent}>
            <Ionicons name="cart-outline" size={30} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        {selectedMenu && (
          <View style={styles.orderPopup}>
            <Text style={styles.popupTitle}>{selectedMenu.nama}</Text>
            <Text style={styles.popupPrice}>Harga: Rp. {selectedMenu.harga}</Text>
            <Text>Jumlah pesanan:</Text>
            <TextInput
              style={styles.quantityInput}
              keyboardType="numeric"
              value={quantity.toString()}
              onChangeText={(text) => setQuantity(parseInt(text))}
            />
            <TouchableOpacity style={styles.orderButton} onPress={submitOrder}>
              <Text style={styles.orderButtonText}>Pesan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedMenu(null)}>
              <Ionicons name="close-circle" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        {searchText !== '' && searchResults.length === 0 ? (
          <Text>Menu tidak ditemukan.</Text>
        ) : (
          <FlatList
            data={searchResults.length > 0 ? searchResults : menuData}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={renderMenu}
            numColumns={2}
            contentContainerStyle={styles.menuList}
          />
        )}
      </View>
      <View style={styles.buttonContainer2}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DaftarMenuUser')}
        >
          <View style={styles.buttonContent}>
            <Entypo name="shop" size={24} color="white" />
            <Text style={styles.buttonText}>Belanja</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Riwayat')}
        >
          <View style={styles.buttonContent}>
            <Octicons name="history" size={24} color="white" />
            <Text style={styles.buttonText}>Riwayat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BerandaPengguna')}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="md-home" size={24} color="white" />
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
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    paddingTop: Constants.statusBarHeight,
  },
  input: {
    borderWidth: 0.5,
    width: '80%',
    //weight: 50,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 5,
    marginTop: 13,
    marginRight: 10,
    marginLeft: 17,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    fontSize: 15,
    //fontWeight: 'bold',
  },
  menuList: {
    //paddingVertical: 10, (Tidak berfungsi ketika fungsi search ditambahkan, harusnya hal ini tidak ada hubungannya dengan tampilan!
    // Solusi sementara, menggunakan padding top dan bottom sebagai gantinya.
    paddingTop: 10,
    paddingBottom: 155,
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
    //borderRadius: 3.5,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    //borderRadius: 3.5,
  },
  gambarMenu: {
    width: '100%',
    height: '100%',
  },
  detailMenu: {
    alignItems: 'flex-start',
    marginTop: 1,
    marginLeft: 4,
  },
  namaMenu: {
    fontSize: 15,
    marginBottom: 2,
  },
  hargaMenu: {
    fontSize: 15,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer1: {
    alignItems: 'center',
    flexDirection: 'row',
    //width: '100%',
    height: 75,
    backgroundColor: '#4c1518',
  },
  buttonContainer2: {
    flexDirection: 'row',
    width: '100%',
    height: 75,
    backgroundColor: '#4c1518',
    justifyContent: 'space-between',
    //alignItems: 'center',
    //paddingHorizontal: 10,
    //paddingVertical: 8,
    position: 'absolute',
    bottom: 0,
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
