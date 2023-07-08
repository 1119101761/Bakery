import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function BerandaAdmin({ navigation }) {
  return (

    <View style={styles.container}>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Admin')
          }
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Mahasiswa')}
        >
          <Text style={styles.buttonText}>Input Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Akademik')}
        >
          <Text style={styles.buttonText}>Pesanan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Pendaftaran')}
        >
          <Text style={styles.buttonText}>Riwayat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Pendaftaran')}
        >
          <Text style={styles.buttonText}>Pesanan</Text>
        </TouchableOpacity>
        
      </View>
      <Image style={styles.logo} source={require('../assets/villa.jpeg')} />
        <Text style={styles.titleContainer}>Selamat Datang Di Stikom PGRI Banyuwangi</Text>
      <Text style={styles.paragrafContainer}>
        STIKOM PGRI Banyuwangi telah beroperasi tahun 1993 dengan SK Dikti No. 127/DIKTI/KEP/1993 tanggal 20 April 1993. Sistem pendidikan Sekolah Tinggi Ilmu Komputer PGRI Banyuwangi membuat sistem pendidikan dua jalur gelar yaitu : Diploma 3 (D3) dan Strata 1 (S1)</Text>

      <Text style={styles.titleContainer}>FASILITAS KAMPUS</Text>

      <Text style={styles.paragrafContainer}>Untuk meningkatkan kegiatan belajar mahasiswa, saat ini kampus telah memfasilitasi. 5 Laboratorium komputer mencakup Lab Basis Data, Lab Multimedia, Lab Rekayasa Perangkat Lunak, Lab Pemrograman, Lab Artificial Intelegency. Selain itu juga ada Lab Jaringan lengkap beserta mikrotiknya.</Text>

      <Text style={styles.titleContainer}>SEKILAS TENTANG KAMI</Text>

      <Text style={styles.paragrafContainer}>STIKOM BANYUWANGI merupakan kampus TI yang terlengkap di Banyuwangi. STIKOM BANYUWANGI memiliki Gedung Berlantai 3 dengan fasilitas - fasilitas yang sangat memadai untuk dunia IT. Dan sampai saat ini STIKOM terus menerus melakukan perubahan yang lebih baik dan mencetak lulusan - lulusan terbaik agar sesuai semboyan STIKOM BANYUWANGI</Text>

    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  titleContainer: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3C3D64',
    marginBottom: 10,
    borderRadius:10,
    borderColor: 'white',
    margin:10,
  },
  paragrafContainer:{
    fontSize:12,
    color: '#3C3D64',
    marginBottom: 10,
    textAlign: 'justify',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 70,
    borderWidth: 0,
    backgroundColor: '#3C3D64',
    
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginVertical: 10,
    margin:1,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    logo: {
    height: 140,
    width: '100%',
    },

});
