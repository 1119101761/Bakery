import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Booking({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Pengguna')}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Nilai')}
        >
          <Text style={styles.buttonText}>Nilai</Text>
        </TouchableOpacity>
           <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('')}
        >
          <Text style={styles.buttonText}>E-Learning</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('')}
        >
          <Text style={styles.buttonText}>SIM</Text>
        </TouchableOpacity>
        
      </View>
        <Text style={styles.titleContainer}>Penerimaan mahasiswa baru</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  titleContainer: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
