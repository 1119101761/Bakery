import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const Belanja = ({ route }) => {
  const { menu } = route.params;
  const [jumlahPesanan, setJumlahPesanan] = useState(1);

  const kurangiJumlahPesanan = () => {
    if (jumlahPesanan > 1) {
      setJumlahPesanan(jumlahPesanan - 1);
    }
  };

  const tambahJumlahPesanan = () => {
    setJumlahPesanan(jumlahPesanan + 1);
  };

  const pesanMenu = () => {
    
    console.log(`Menu ${menu.nama} dipesan sebanyak ${jumlahPesanan}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.namaMenu}>{menu.nama}</Text>
      <Text style={styles.hargaMenu}>Rp. {menu.harga}</Text>

      <View style={styles.jumlahContainer}>
        <TouchableOpacity style={styles.button} onPress={kurangiJumlahPesanan}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={jumlahPesanan.toString()}
          onChangeText={text => setJumlahPesanan(parseInt(text))}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={tambahJumlahPesanan}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.pesanButton} onPress={pesanMenu}>
        <Text style={styles.pesanButtonText}>Pesan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  namaMenu: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hargaMenu: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },
  jumlahContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 50,
    textAlign: 'center',
  },
  pesanButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  pesanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Belanja;
