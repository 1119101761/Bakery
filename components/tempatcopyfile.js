import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const DaftarMenu = ({ navigation }) => {
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
    const imageSource = `data:${item.image};base64,${item.image}`;

    return (
      <View style={styles.menuItem}>
        <Image source={{ uri: imageSource }} style={styles.menuImage} />
        <View style={styles.menuDetails}>
          <Text style={styles.menuName}>{item.nama}</Text>
          <Text style={styles.menuPrice}>{item.harga}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer1}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DaftarMenu')}
        >
          <Text style={styles.buttonText}>Button 1</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        <FlatList
          data={menuData}
          keyExtractor={(item) => item._id}
          renderItem={renderMenu}
          contentContainerStyle={styles.menuList}
        />
      </View>
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
    padding: 16,
  },
  buttonContainer1: {
    alignItems: 'center',
    height: 75,
    backgroundColor: '#4c1518',
    justifyContent: 'center',
    marginBottom: 16,
  },
  menuContainer: {
    flex: 1,
  },
  buttonContainer2: {
    flexDirection: 'row',
    height: 75,
    backgroundColor: '#4c1518',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },

    button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'gray',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuImage: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 8,
  },
  menuDetails: {
    flex: 1,
  },
  menuName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  menuPrice: {
    fontSize: 16,
    color: '#888',
  },
});

export default DaftarMenu;
