import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat,Day, MessageText } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, TextInput, View, YellowBox, Button , ImageBackground , Image,Text,TouchableOpacity,Icon } from 'react-native'
///import firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';
import { Bubble , Send,Time } from 'react-native-gifted-chat';
import Rain from './raining';
import Header from './Header';
import Reaction from './Reaction';
import Suggest from './suggestions';
import Clipboard from '@react-native-clipboard/clipboard';
import database from '@react-native-firebase/database';
import SoundPlayer from 'react-native-sound-player';
import Bani from './bani';

YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);

const chatsRef = firestore().collection('chatsss');

let mess:any;
let replying:any;
let deleting:any;
let deleted:any;
let deleter:string;
let start:boolean=false;
let replied_mann:any;
let replying_message:any;
let reply:boolean=false;
let reply_hole_mess:any;

export default function App() {

    const [user, setUser] = useState(null);
    const [name, setName] = useState('');

    const [messages, setMessages] = useState([]);
    const [isTyping, setType] = useState(false);
    const [reading,setread] = useState(false);
    const [sreply_man,setReplyman]=useState('');
    const [sreplying,setReplying] = useState('');
    const [reply,setreply] = useState(false);


    function checking()
    {
        database().ref('users').child('Toy').once('value')
        .then(snapshot => {if(snapshot.val().typing==true) setType(true); else setType(false) })
    }

    function onInputTextChanged(e) {
        /// setcurrMess(e);
        /// for deleted message action
        if (e === '') {
            database().ref('users').child(name).update({
                typing:false
               })
        } else {
            database().ref('users').child(name).update({
             typing:true
            })
        }

        }

        function dismiss()
        {
          setreply(false);
            replying="";
        }

        function renderFooter(){

            if(!reply){
            checking();
            if (isTyping){
              return (<View style={[styles.balloon, {backgroundColor: 'green'}]}>
              <Text style={{paddingTop: 5, color: 'white'}}>Toy is typing....</Text>
              <View
              style={[
                styles.arrowContainer,
                styles.arrowLeftContainer,
              ]}
            >
              <View style={styles.arrowLeft} />
            </View>
            </View>
          );
            }
            else return null;}


            else return(
                <TouchableOpacity onPress={dismiss}>
                    <View style={{height: 50, flexDirection: 'row'}}>
                    <View style={{height:50, width: 5, backgroundColor: 'red'}}></View>
                <View style={{flexDirection: 'column',backgroundColor: 'white',width:400}}>
                    <Text style={{color: 'red', paddingLeft: 10, paddingTop: 5}}>{sreply_man}</Text>
                    <Text style={{color: 'black', paddingLeft: 10, paddingTop: 5}}>{sreplying}</Text>
                </View>
                </View>
            </TouchableOpacity>
            )
        }

    function renderBubble (props) {
      return (
        <Bubble
          {...props}
          textStyle={{
            right: {
              color: 'black',
            },
          }}
          wrapperStyle={{
            right: { borderTopRightRadius: 15,backgroundColor:'#6495ED' }
          }}
  
        />
      )

    }

    function kholsa_delete(mess:string)
    {
       let res:string="";
       deleter="";
       let i:number;
       let indx=mess.indexOf("Deleted404:");
       for( i=0;i<indx;i++) {
         deleter+=mess.charAt(i);
        }
        /// console.log("I er man"+i);
        i=i+11;
        if(deleter==user.name) deleter="You";
       for(;i<mess.length;i++) {res+=mess[i]};
       return res;
    }

    function reply_kholasa(mess:any)
    {
        let ress:string="";
        let indx=mess.indexOf("reply404");
        let i:number;
        replied_mann="";
        replying="";
        for(i=0;i<indx;i++) replied_mann+=mess.charAt(i);
        /// setRepliedman(replied_mann);
        i=i+8;
        indx=mess.indexOf("::");
        for(i;i<indx;i++) replying+=mess.charAt(i);
        i=i+2;
        for(i;i<mess.length;i++) ress+=mess.charAt(i);
        return ress;
    }

    function renderMessageText(props)
    {
       if(!props.currentMessage.text.includes("Deleted404")&&!props.currentMessage.text.includes("reply404")) { return <MessageText {...props} />;}
       else if(props.currentMessage.text.includes("Deleted404")) {
         deleted=kholsa_delete(props.currentMessage.text);
         ///console.log(deleted);
         return(<View style={{ padding: 5}}>
        <View style={{backgroundColor: '#005CB5', borderRadius: 15}}>
          <View style={{flexDirection: 'row',}}>
            <View style={{height:50, width: 10, backgroundColor: '#00468A', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}} />
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.replier_name}>{deleter}:</Text>
                <Text style={{color: 'white', paddingHorizontal: 10, paddingTop: 5, fontWeight: '700'}}>{deleted}</Text>
                <Text style={styles. italic}>This message has been deleted</Text>
                <Text style={{ letterSpacing: 1,fontSize:10,color:'black'}}>This message will be shown deleted from next chat session</Text>
              </View>
          </View>
        </View>
      </View>)}
      else if(props.currentMessage.text.includes("reply404"))
      {
        replying_message=reply_kholasa(props.currentMessage.text);
        return(<View style={{ padding: 5}}>
          <View style={{backgroundColor: 'green', borderRadius: 15}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{height:50, width: 10, backgroundColor: 'white', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}} />
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.replier_name}>{replied_mann}:</Text>
                  <Text style={{color: 'black', paddingHorizontal: 10, paddingTop: 5, fontWeight: '700'}}>{replying}</Text>
                  <Text style={{color:'white',paddingRight:7}}>{replying_message}</Text>
                </View>
            </View>
          </View>
        </View>);
      }
    }

     function delet(index:any)
    {
         console.log(deleter);
            chatsRef.get().then((querySnapshot) => {
                querySnapshot.docs.map((doc) => {
                    if(doc.data()._id==index){chatsRef
                        .doc(doc.id)
                        .update({
                          text: deleter+"Deleted404: "+deleting,
                        })}
                })
              ///  console.log(tempDoc)
              })
    }

    function sounds( mess:any)
    {
      let res:string;
      if(mess=="long") res="longpressed";
      else if(mess=="rain") res="rain";
      else if(mess=="haha") res="haha";
      else if(mess=="ragi") res="lion";
      else if(mess=="kutta") res="kutta";
      else if(mess=="congrats") res="congrats";
      else if(mess=="ummah") res="ummah";
      else if(mess=="hachi") res="hachi";
      else if(mess=="kashi") res="kashi";

        try {
            // play the file tone.mp3
           /// console.log(" mess");
            SoundPlayer.playSoundFile(res, 'wav');
        } 

        catch (e) {
            console.log(`cannot play the sound file`, e)
        }

    }

     function  onLongPress(context, message) {
       sounds("long");
        const options = ['Copy','Reply','Delete Message', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        context.actionSheet().showActionSheetWithOptions({
            options,
            cancelButtonIndex
        }, (buttonIndex) => {
            switch (buttonIndex) {
                case 0:
                    Clipboard.setString(message.text);
                    break;
                case 1:
                  setReplying(message.text);
                  setReplyman(message.user.name);
                  setreply(true);
                    break;
                case 2:
                    deleting=message.text;
                    deleter=message.user.name;
                    delet(message._id);// Your delete logic
                    break;
                case 2:
                    break;
            }
        });
    }
    

   
    function  renderDay(props) {
        return <Day {...props} textStyle={{color: 'white'}}/>
      }


    useEffect(() => {
        if(!reading)
        readUser();
       /// replying="";
       /// reply=false;
       /// reply_hole_mess=null;
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added'||type==='modified')
                .map(({ doc }) => {
                    const message = doc.data();
                   /// console.log(message);

                    if(message.text.includes("Deleted404")&&start){
                    return {...message,_id:message._id+"59", createdAt: message.createdAt.toDate()}
                    }

                    else if(message.text.includes("Deleted404")&&!start)
                    return {...message, createdAt: message.createdAt.toDate(),text:"Deleted"}
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    else 
                    return { ...message, createdAt: message.createdAt.toDate()}
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })
        return () => {unsubscribe()}
    }, [])

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

   
    async function readUser() {
        start=false;
        setreply(false);
        const userr = await AsyncStorage.getItem('user');
        const naming= await AsyncStorage.getItem('particular');
        console.log(naming);
        if (userr) {
            if(name=="")  setName(JSON.parse(naming));
            setUser(JSON.parse(userr));
            /// console.log(user.user.name);
            setread(true);
        }
    }


    async function handleSend(messages) {
        /// console.log("This is my message"+messages[0].text);


        if(messages[0].text.includes("rain")) sounds("rain");
        else if(messages[0].text.includes("birds")) sounds("birds");
        else if(messages[0].text.includes("kutta")) sounds("kutta");
        else if(messages[0].text.includes("ummah")) sounds("ummah");
        else if(messages[0].text.includes("congrats")) sounds("congrats");
        else if(messages[0].text.includes("ragi")) sounds("ragi");
        else if(messages[0].text.includes("kashi")) sounds("kashi");
        else if(messages[0].text.includes("hachi")) sounds("hachi");
        
        /// setCur(messages[0].text);
        if(!start) start=true;
        mess=messages[0].text;
        let updated;
        ////if(reply)
        ///console.log(updated);
        if(reply) {reply_hole_mess=messages[0]; updated=sreply_man+"reply404"+sreplying+"::"+reply_hole_mess.text;
        const writes = messages.map((m) =>{if(reply&&reply_hole_mess==m) m.text=updated;chatsRef.add(m)});
        setreply(false);
        await Promise.all(writes);
      }

        else {const writes = messages.map((m) =>{chatsRef.add(m)});
        await Promise.all(writes);}
    }


    let suggst:any=null;
    
    if(mess!=undefined||mess!=null)
     suggst=<View><Rain message={mess}/></View>;

    const head=<View><Header nam={name}/></View>;
    const gift= <GiftedChat  renderMessageText ={renderMessageText }  renderChatFooter={renderFooter}  onInputTextChanged={onInputTextChanged}   keyboardShouldPersistTaps={'always'} onLongPress={onLongPress} renderDay={renderDay} renderBubble={renderBubble}  messages={messages} user={user} onSend={handleSend}/> ;
    const res:any=<View><ImageBackground  style={{ width: '100%', height: '100%' }} source={require('./back.jpg')}>{suggst}{head}{gift}</ImageBackground></View>;
    return(res);

}

/// isLoadingEarlier={true}
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
    },
    container1: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 0
      },
      title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
      },
      item: {
        marginVertical: 14,
        flexDirection: 'row'
     },
     itemIn: {
         marginLeft: 10
     },
     itemOut: {
        alignSelf: 'flex-end',
        marginRight: 10
     },
     balloon: {
        maxWidth: 250,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        borderRadius: 20,
     },
     arrowContainer: {
         position: 'absolute',
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         zIndex: -1
         // backgroundColor: 'red'
     },
     arrowLeftContainer: {
         justifyContent: 'center',
         alignItems: 'flex-start',
         // backgroundColor: 'green'
     },
     
     arrowLeft: {
         left: -20,
     },
     italic: {fontStyle: 'italic',color: 'white', paddingHorizontal: 10, paddingTop: 5, fontWeight: '700'},
     replier_name :{color: 'red', paddingHorizontal: 10, paddingTop: 5,fontWeight: 'bold'}
})



//// const writes = messages.map((m) => chatsRef.add(m));

/*
 const newMessagesArray = messages.map((msg) => {
            if (msg._id!=index) {
            
            return{msg;
        } // same message ref
        });
        // set the new state
        setMessages(newMessagesArray);

*/