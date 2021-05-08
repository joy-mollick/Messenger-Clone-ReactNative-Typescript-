
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    Alert
  } from 'react-native';
 
import React, { useState, useEffect } from 'react';
//// import { useNavigation } from '@react-navigation/native';


 function signup({ navigation }) {

  /// const navigation = useNavigation();



  const navigationOptions = {
		title: 'SignUp'
	};

  const[name,setName]=useState('');
  const[my_pass,set_pass]=useState('');
  const[login,setlogin]=useState(false);

  useEffect(() => {
    checking();
    },
 [login]);


 async function checking()
 {
    const userr = await AsyncStorage.getItem('user');
    ///if(userr!=null) setlogin(true);
    if(userr!=null){
    navigation.navigate('Profile', {
        name: name,
      }); 
    }
 }

  async function loginn()
  {
     
    if(login){
      database().ref('users').child(name).once('value')
    .then(snapshot => {
        /// exists that name 
        if(snapshot.val()==null) {alert("This username doesn't exist");}
          
        else {

            if(snapshot.val().password!=my_pass){
              Alert.alert(
                'Hey !',
                'Your password of this account is wrong !'
              )
            }

            else { 
         const _id = name+"59";
         const user = { _id, name }
         AsyncStorage.setItem('user', JSON.stringify(user));
         //// AsyncStorage.setItem('user',JSON.stringify(user));
          AsyncStorage.setItem('particular',JSON.stringify(name));
          database()
          .ref('users').child(name)
          .set({
            name: name,
            password: my_pass,
            login:true
          })
          .then(() =>  Alert.alert(
            'Hey !',
            'You are logged in !'
          ) );

          navigation.navigate('Profile', {
            name: name,
          });
                 }

            }

    }); }
  
  }

  async function handlePress() {

    if(login!=true){
    
     database().ref('users').child(name).once('value')
  .then(snapshot => {

      /// exists that name 
      if(snapshot.val()!=null) {
        Alert.alert(
          'Hey !',
          'Username already exists !'
        )
      }

      /// else created account 
      else {
          /// stored in device 
       
      database()
  .ref('users').child(name)
  .set({
    name: name,
    password: my_pass,
    login:true
  })
  .then(() =>    Alert.alert(
    'Hey !',
    'Your account has been created!'
  ));
     }

  });
}

else {loginn()};

}

function handle_login()
{
  setlogin(true);
}

    return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Enter your username" value={name} onChangeText={setName} />
                <TextInput style={styles.input} placeholder="Enter your password" value={my_pass} onChangeText={set_pass}/>
                <Button onPress={handlePress} title={!login?"Sign Up":"LogIn"}  style={{borderRadius: 15}}/>
                {!login?<Text onPress={handle_login}> Have an account ?  Login here</Text>:null}
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
        borderRadius:10,
    },
})

export default  signup;

/*

console.log('login successful, navigate to chat.');
		this.props.navigation.navigate('Chat', {
			name: this.state.name,
		});

*/