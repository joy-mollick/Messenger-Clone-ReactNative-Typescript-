
import React , { useState, useEffect } from 'react' ;
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    Alert
  } from 'react-native';


  /// this.props.navigation.state.params.name

 function profile({ navigation }) {

    const [name,setName] = useState('');
   
  //  navigationOptions = ({ navigation }) => ({
//		title: (navigation.state.params || {}).name || 'Profile!'
//	});

useEffect(() => {
    reading();
    },
 []);

async function  reading()
{
    await AsyncStorage.getItem('particular').then(value =>
        //AsyncStorage returns a promise so adding a callback to get the value
        setName(value)
        //Setting the value in Text
    );
}

    async function onPressLogin()
    {
         navigation.navigate('Chat', {
			name: name
		});
    }

    return (
        <View style={styles.container}>
            <Text>My name : {name}</Text>
            <Button title="Chat" onPress={onPressLogin}/>
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
    }
})

export default profile;