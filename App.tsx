/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState, useEffect } from 'react';

 import {
   StyleSheet,
   View,
   Text,
   TextInput,
   TouchableOpacity,
   Button
 } from 'react-native';

 import { createStackNavigator } from 'react-navigation-stack';
 import { createAppContainer } from "react-navigation";
 import SignUp from './signup';
 ///import Upload from './UploadScreen';
 import Chat from './chat_box';
 import Profile from './profile';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import database from '@react-native-firebase/database';


 const NavStack= createStackNavigator({
Login: { screen: SignUp },
Profile: { screen: Profile },
Chat: { screen: Chat }
});

const App= createAppContainer(NavStack);

export default App;