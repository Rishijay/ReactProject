import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, ToastAndroid, Alert,
AsyncStorage, BackHandler } from 'react-native';
import {List, ListItem } from 'react-native-elements';
import Touchable from 'react-native-platform-touchable';


export default class FetchExample extends React.Component {

    static navigationOptions = {
        title: 'Members List',
      };

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    AsyncStorage.getItem("empid").then((value)=>{
      this.setState({"empid":value});    

    AsyncStorage.getItem("orgid").then((value)=>{
      this.setState({"orgid":value});
      this.getData();

    });

  });

  

  this.props.navigation.addListener("didFocus", () => {
  this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      
    Alert.alert(
      '',
      'Do you want to logout.?',
      [
        {text: 'Exit App', onPress: () => BackHandler.exitApp()},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Logout', onPress: () => this.props.navigation.navigate('LoginScreen')},
      ],
      {cancelable: true},
    );
    return true;
  });

});

  this.props.navigation.addListener("didBlur", () => {
    this.backHandler.remove();
  });

  }

  getData = () => {
    return fetch('https://randomuser.me/api/?seed=1&page=1&results=20')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    const {navigate} = this.props.navigation;
    return(
      <View style={styles.scene}>
      
        <FlatList
          data={this.state.dataSource}
        renderItem={({item}) => (
            <ListItem
                roundAvatar
                title={item.name.title+' '+item.name.first+' '+item.name.last}
                subtitle={item.gender}
                style={styles.option}
                background={Touchable.Ripple('#ccc', false)}
                onPress={() => {
                    this.props.navigation.navigate('DetailsScreen', {
                      name: item.name.title+' '+item.name.first+' '+item.name.last,
                  })
                  }}
            />
        )}
          keyExtractor = {({id}, index) => id}
        />
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    user: {
        width: '100%',
        backgroundColor: '#333',
        marginBottom: 10,
        paddingLeft: 25,
    },
    userName: {
        fontSize: 17,
        paddingVertical: 20,
        color: '#fff'
    },
    option: {
        backgroundColor: '#fdfdfd',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EDEDED',
      },
});