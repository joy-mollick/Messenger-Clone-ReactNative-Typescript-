
import React from 'react';
import { StyleSheet, TextInput, View, YellowBox, Button , ImageBackground,Image } from 'react-native';
 /// import MakeItRain from 'react-native-make-it-rain';
import Snow from 'react-native-snow';

export default function Reaction(props) {
    const mess=props.mess;
    let res:any;
    if(mess=="snow") res=<Snow/>;
    else res=<Snow/>;
    return (
        <View>
            {res}
        </View>
    )
}
