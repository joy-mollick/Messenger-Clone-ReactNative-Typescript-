import React from 'react';
import {View, Text, StyleSheet,Button,Image} from 'react-native';

interface myprops
{
    nam:any
}

export default class Header extends React.Component<myprops> {

  render() {
    return (
      <View style={styles.header}>
          <View style={{flexDirection: 'row'}}>
        <Image style={styles.anonymous} source={require('./anonymous.png')}/>
        <Text style={styles.title}>{this.props.nam}</Text>
        <Text style={styles.active}>Online</Text>
        </View>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  anonymous: {
    height: 40,
   /// alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    paddingLeft:10
  },
  
  header: {
    height: 55,
     backgroundColor: 'white',
   // alignItems: 'center',
    //justifyContent: 'flex-end',
    padding: 10,
  },

  title: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft:15
  },

  active :
  {
    flex:1,
    color:'black',
    fontStyle: 'italic',
    fontSize:14,
    justifyContent:'flex-end',
    paddingLeft:135
  }

});