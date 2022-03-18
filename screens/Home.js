import React, {Component} from 'react';
import {View, Text, FlatList,Button,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      listData: []
    }
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });
  
    this.searchfriends();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  searchfriends= async () => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://localhost:3333/api/1.0.0/search", {
          'headers': {
            'X-Authorization':  value
          }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
              this.props.navigation.navigate("Login");
            }else{
                throw 'Something went wrong';
            }
        })
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            listData: responseJson
          })
        })
        .catch((error) => {
            console.log(error);
        })
  }

   addfriends= async (user_id) => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://localhost:3333/api/1.0.0/user/"+user_id+ "/friends", {
           method: 'POST',
          'headers': {
            'X-Authorization':  value
          }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
              this.props.navigation.navigate("Login");
            }else{
                throw 'Something went wrong';
            }
        })
        .catch((error) => {
            console.log(error);
        })
  }
  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
        this.props.navigation.navigate('Login');
    }
  };

  render() {


      return (
        <View style={styles.container}>
          <FlatList
                data={this.state.listData}
                renderItem={({item}) => (
                    <View>
                      <Text>{item.user_givenname} {item.user_familyname}</Text>
                      <Button title="Ask to be my friend"
                    onPress={() => this.addfriends(item.user_id)} 
                    />
                    </View>
                )}
                keyExtractor={(item,index) => item.user_id.toString()}
              />
              
        </View>
      );
    }
  }
    
    const styles = StyleSheet.create({
      Button:{
        backgroundColor: 'orange',
        fontSize: 15,
          
       },
  
      container: {
         flex: 1,
         justifyContent: 'space-evenly',
         alignItems: 'center',
         flexDirection:'column',
         padding:'5',
         backgroundColor: 'darkslateblue'
       },
       Text:{
         margin: 10,
         height: 35,
         borderWidth: 1,
         padding: 7,
       }
  })
     





export default Home;