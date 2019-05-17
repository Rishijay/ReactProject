import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';
import {ToastAndroid, ActivityIndicator} from 'react-native';
import FormData from 'FormData';

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props)
    
        this.state = {
          username: '',
          password: '',
          productID: '',
        }
      }
  static navigationOptions = {
    title: 'Login',
    header: null,
  };

login = () => {
    this.setState({ isLoading: true });

     var data = new FormData();
    data.append("emp_id", this.state.username);
    data.append("emp_password", this.state.password);

    fetch('http://premisafe.com/staff_handler/staff_handler_json/password_set2.php', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
    },
    body:data,
    })
    .then((response) => response.json())
    .then((responseJson) => {
        console.log("body ",JSON.stringify(data));
        console.log('response object:',responseJson[0].error_code)
        if(responseJson[0].error_code==100){
          this.props.navigation.navigate('FetchExample')
          AsyncStorage.setItem("empid",this.state.username)
          AsyncStorage.setItem("orgid",responseJson[0].org_id)
          ToastAndroid.show("orgid "+responseJson[0].org_id, ToastAndroid.SHORT);
        }else{
          ToastAndroid.show(""+responseJson[0].message, ToastAndroid.SHORT);
        }
    })
    .catch((error) => {
      console.error(error);
      ToastAndroid.show("Error : "+error, ToastAndroid.SHORT);
    });

};

    signIn = () => {
        var txtusername = this.state.username;
        var txtpassword = this.state.password;
        if(txtusername!="" && txtpassword!=""){
          this.login();
        }else{
          ToastAndroid.show('Both fields are compulsary', ToastAndroid.SHORT);  
        }
    };

  render() {
    const {navigate} = this.props.navigation;
    return (
      
      <View style={styles.container}>
        
        <View style={styles.tabBarInfoContainer}>
        <Image
              source={
                 require('../assets/images/robot-dev.png')
              }
              style={styles.welcomeImage}
            />
          <Text style={styles.tabBarInfoText}>Login</Text>
          <TextInput ref='username' style={styles.UsernameInput} placeholder="Emp ID - Ris123" onChangeText={(text) => this.setState({username:text})}/>
          <TextInput ref='password' style={styles.PasswordInput} placeholder="Password - 12345" onChangeText={(text) => this.setState({password:text})} secureTextEntry={true} keyboardType='numeric'/>
          <Button style={{width:"100%", marginTop:20, marginLeft:30, marginRight:30}} title="Login" 
          onPress={this.signIn.bind(this)}
          />
        </View>
      </View>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    tabBarInfoContainer: {
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          //elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 30,
    },
    tabBarInfoText: {
      fontSize: 20,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
      marginTop: 10
    },
    helpLink: {
      paddingVertical: 15,
    }, 
    UsernameInput: {
        width: "100%",
        marginTop: 10,
        padding: 10,
        textAlign:"center",
        fontSize: 17,
      },
      PasswordInput: {
        width: "100%",
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        fontSize: 17,
        textAlign:"center"
      },
  });