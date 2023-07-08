import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TampilanAwal from './components/TampilanAwal';
import LoginPage from './components/LoginPage';
import Registrasi from './components/Registrasi';
import BerandaAdminn from './components/BerandaAdmin';
import BerandaPengguna from './components/BerandaPengguna';
import BiodataScreen from './components/BiodataScreen';
import Booking from './components/Booking';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tampilan" component={TampilanAwal} options={{ headerShown: false }} />
        <Stack.Screen name="BerandaPengguna" component={BerandaPengguna} options={{ headerShown: false }} />
        <Stack.Screen name="BerandaAdmin"component={BerandaAdminn} options={{ headerShown: false }}/>
        <Stack.Screen name="Masuk"component={LoginPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Biodata" component={BiodataScreen} options={{ headerShowwn: false }} />
        <Stack.Screen name="Booking" component={Booking} options={{ headerShown: false }} />
        <Stack.Screen name="Registrasi" component={Registrasi} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer> 
  );
}
