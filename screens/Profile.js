import React, { Component} from 'react';
import {Text,View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
class Profile extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            listData: []
            
          
        };
    }
    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
          this.checkLoggedIn();
        });
      
        this.getData();
      }
    
      componentWillUnmount() {
        this.unsubscribe();
      }
    
      getData = async () => {
        const userId = await AsyncStorage.getItem('@session_id');
        const value = await AsyncStorage.getItem('@session_token');
        fetch("http://localhost:3333/api/1.0.0/user/"+ userId, {
              'headers' : {
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
      updateUser = async () => {
        const userId = await AsyncStorage.getItem('@session_id');
        const value = await AsyncStorage.getItem('@session_token');
        fetch("http://localhost:3333/api/1.0.0/user/"+ userId, {
              'headers' : {
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


    
    
      checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if (value == null) {
            this.props.navigation.navigate('Login');
        }
      };
    render(){
        if (this.state.isLoading){
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Loading..</Text>
              </View>
            );
        }else{
        return (
          

                      <View>
                      <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
                        <Text>{this.state.listData.first_name} {this.state.listData.last_name} {this.state.listData.email} </Text>
                      </View>
                 
          </View>
        )
    }
    }
}



export default Profile;