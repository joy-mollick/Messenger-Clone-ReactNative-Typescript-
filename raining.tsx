import React, {Component} from 'react';
import { View, Text,Image } from 'react-native';
import MakeItRain from 'react-native-make-it-rain';


function  Rain (props) {
  
    let show:any=<Image source={require('./leaves.png')}/>;
    if(props.message.includes("rain")) {show=<Image source={require('./rain_drop.png')}/>}
   /// else if(props.message.includes("Allah")) show=<Image source={require('./rob.png')}/>;
    else if(props.message.includes("valobash")) show=<Image source={require('./rose.png')}/>;
   else if(props.message.includes("taka")) show=<Image source={require('./taka.jpg')}/>;
    else if(props.message.includes("nice")) show=<Image source={require('./leaves.png')}/>;
    else if(props.message.includes("sundor")) show=<Image source={require('./leaves.png')}/>;
    else if(props.message.includes("hmm")) show=<Image source={require('./snow.png')}/>;
    else show=<Image source={require('./leaves.png')}/>;

    return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <MakeItRain
          numItems={30}
          itemComponent={show}
          itemDimensions={{width: 70, height: 70}}
          itemTintStrength={0.0}
        />
      </View>
    );
  }

export default Rain;