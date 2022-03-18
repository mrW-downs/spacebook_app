import React, { Component } from 'react';
import { FlatList,View, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Friendrequest extends Component{
    constructor(props){
        super(props);


    this.state = {
        isLoading: true,
        listRequest: [],
      
        
        
    }
}

componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });
  
    this.getRequest();
    
  }

  componentWillUnmount() {
    this.unsubscribe();
  }


getRequest = async () => {
    //Validation here...
        const value = await AsyncStorage.getItem('@session_token');
        return fetch ("http://localhost:3333/api/1.0.0/friendrequests", {
            'headers' : {
            'X-Authorization':  value,
            },
        })
        

            .then((response) => {
                if(response.status === 200){
                    return response.json()
                }else if(response.status === 401){
                  this.props.navigation.navigate("Login");
                  throw 'Unauthorised';
                }else if(response.status === 500){
                  throw 'Server Error';
                }else{
                    throw 'Something went wrong';
                }
            })
            .then((responseJson) => {
              this.setState({
                isLoading: false,
                listRequest: responseJson
              })

            })
            .catch((error) => {
                console.log(error);
            })
      }
      acceptFriend = async (user_id) => {
        //Validation here...
       
            const value = await AsyncStorage.getItem('@session_token');
            return fetch ("http://localhost:3333/api/1.0.0/friendrequests/"+user_id, {
                method: 'POST',
                'headers' : {
                'X-Authorization':  value,
                },
            })
            
    
                .then((response) => {
                    if(response.status === 200){
                        return response.json()
                    }else if(response.status === 401){
                      this.props.navigation.navigate("Login");
                    }else if(response.status === 404){
                      throw 'Not Found';
                    }else if(response.status === 500){
                      throw 'Server Error'
                    }else{
                        throw 'Something went wrong';
                    }
    
                })
                .catch((error) => {
                    console.log(error);
                })
          }
          unacceptFriend = async (user_id) => {
            //Validation here...
            
                const value = await AsyncStorage.getItem('@session_token');
                return fetch ("http://localhost:3333/api/1.0.0/friendrequests/"+user_id, {
                    method: 'DELETE',
                    'headers' : {
                    'X-Authorization':  value,
                    'Content-Type':'application/json',
                    },
                })
                .then((response) => {
                  if(response.status === 200){
                      return response.json()
                  }else if(response.status === 401){
                    this.props.navigation.navigate("Login");
                  }else if(response.status === 404){
                    throw 'Not Found';
                  }else if(response.status === 500){
                    throw 'Server Error'
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

render(){
    return (
      <View style={styles.container}>
        <FlatList
              data={this.state.listRequest}
              renderItem={({item}) => (
                  <View>
                    <Text>You have a astronaut buddy request:{item.first_name} {item.last_name}</Text>
                    <Button title="Accept"
                    onPress={() => this.acceptFriend(item.user_id)} 
                    />
                     <View style={styles.spacing}/>

            <Button title="Decline"
            onPress={() => this.unacceptFriend(item.user_id)} 
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
  spacing:{
      height: 10,

 
     
  },
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
    padding:'5',
    backgroundColor: 'darkslateblue'
  },
  Text:{
    margin: 10,
    height: 35,
    borderWidth: 1,
    padding: 5,


  }



})



export default Friendrequest; 
