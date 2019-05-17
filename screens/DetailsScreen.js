import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

export default class GenerateLeadScreen extends React.Component {
    constructor(props){
        super(props)
    
        this.state = {
            textInput : []
        }
      }
  static navigationOptions = {
    title: 'Profile Screen',
  };

  componentDidMount(){
    this.setState({"name":this.props.navigation.state.params.name});
  }
    
addTextInput = (key) => {
    let textInput = this.state.textInput;
    textInput.push(<TextInput key={key} />);
    this.setState({ textInput })
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
        
      <View style={styles.container}>
      <Text style={styles.tabBarInfoText}>Profile screen for {this.state.name}</Text>
      </View>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
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
      //position: 'center',
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
        //resizeMode: 'contain',
        marginTop: 10,
        padding: 10,
        fontSize: 17,
      },
  });