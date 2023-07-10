import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TampilanAwal from './components/TampilanAwal';
import Login from './components/Login';
import Registrasi from './components/Registrasi';
import BerandaAdmin from './components/BerandaAdmin';
import BerandaPengguna from './components/BerandaPengguna';
import DaftarMenuUser from './components/DaftarMenuUser';
//import DaftarMenuAdmin from './components/DaftarMenuAdmin';
import InputMenu from './components/InputMenu';
//import Promo from './components/Promo';

//import MesinPencarian from './components/MesinPencarian';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tampilan" component={TampilanAwal} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Registrasi" component={Registrasi} options={{ headerShown: false }} />
        <Stack.Screen name="BerandaPengguna" component={BerandaPengguna} options={{ headerShown: false }} />
        <Stack.Screen name="BerandaAdmin" component={BerandaAdmin} options={{ headerShown: false }} />
        <Stack.Screen name="DaftarMenuUser" component={DaftarMenuUser} options={{ headerShown: false }} />
        <Stack.Screen name="InputMenu" component={InputMenu} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
