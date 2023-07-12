import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { Ionicons, MaterialIcons, Entypo, Octicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const BerandaAdmin = ({ navigation }) => {
  const [menuData, setMenuData] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [isMenuOptionsVisible, setMenuOptionsVisible] = useState(false);
  const statusBarHeight = Constants.statusBarHeight;

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

  const handleMenuOptions = (itemId) => {
    setSelectedMenuId(itemId);
    setMenuOptionsVisible(true);
  };

  const handleDeleteMenu = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.7:3000/api/menu/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedMenuData = menuData.filter((item) => item._id !== id);
        setMenuData(updatedMenuData);
        setSelectedMenuId(null);
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Gagal menghapus menu:', error);
      alert('Gagal menghapus menu');
    }
  };

  const handleUpdateMenu = (itemId) => {
    // Arahkan pengguna ke halaman pembaruan menu dengan menyediakan ID menu
    navigation.navigate('UpdateMenu', { itemId: itemId });
    setMenuOptionsVisible(false);
    setSelectedMenuId(null);
  };

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
        <View style={styles.menuOptionsContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteMenu(item._id)} // Pilih menu untuk dihapus
          >
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => handleUpdateMenu(item._id)} // Pilih menu untuk diperbarui
          >
            <Ionicons name="create-outline" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer1}>
        <TouchableOpacity style={styles.tambahMenuContainer} onPress={() => navigation.navigate('InputMenu')}>
          <Ionicons name="add" size={35} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={menuData}
        keyExtractor={(item) => item._id}
        renderItem={renderMenu}
        numColumns={2}
        contentContainerStyle={styles.menuList}
      />
      <View style={styles.buttonContainer2}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Riwayat')}>
          <View style={styles.buttonContent}>
            <Ionicons name="time-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Riwayat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BerandaAdmin')}>
          <View style={styles.buttonContent}>
            <Ionicons name="home-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('InputPromo')}>
          <View style={styles.buttonContent}>
            <Ionicons name="ios-pricetags-sharp" size={24} color="white" />
            <Text style={styles.buttonText}>Promo</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal visible={isMenuOptionsVisible} transparent>
        <TouchableWithoutFeedback onPress={() => setMenuOptionsVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef0ef',
    paddingTop: Constants.statusBarHeight,
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
    position: 'relative',
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
    zIndex: 1,
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
  tambahMenuContainer: {
    right: -120,
    bottom: -580,
    backgroundColor: '#3AFA36',
    borderRadius: 24,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    backgroundColor: '#eef0ef',
  },
  updateButton: {
    position: 'absolute',
    top: 0,
    right: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    backgroundColor: '#eef0ef',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuOptionsContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuOptionButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 4,
    backgroundColor: '#eef0ef',
  },
  menuOptionText: {
    fontSize: 12,
    color: 'black',
  },
});

export default BerandaAdmin;
