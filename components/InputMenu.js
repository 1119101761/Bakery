import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

const InputMenu = () => {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Izin akses ke galeri diperlukan');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const submitMenu = async () => {
    try {
      const formData = new FormData();
      formData.append('nama', nama);
      formData.append('harga', harga);
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'menu_image.jpg',
      });

      const response = await fetch('http://192.168.1.7:3000/api/menu', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setNama('');
        setHarga('');
        setImage(null);

        alert(data.message);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Gagal menambahkan menu:', error);
      alert('Gagal menambahkan menu');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nama Menu"
        value={nama}
        onChangeText={setNama}
      />
      <TextInput
        style={styles.input}
        placeholder="Harga"
        value={harga}
        onChangeText={setHarga}
        keyboardType="numeric"
      />
      <Button title="Pilih Gambar" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button
        title="Tambah Menu"
        onPress={submitMenu}
        disabled={!image || !nama || !harga}
      />
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
  input: {
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
});

export default InputMenu;
