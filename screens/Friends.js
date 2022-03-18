import React, { Component } from 'react';
import { FlatList, Text, View,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Friends  extends Component{
    constructor(props){
        super(props);

        this.state = {
            listofFriends: []
          
            
          
        };
    }
    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
          this.checkLoggedIn();
        });
      
        this.getMyFriends();
        
      }
    
      componentWillUnmount() {
        this.unsubscribe();
      }
      getMyFriends = async () => {
        // Get these from AsyncStorage

      const userid = await AsyncStorage.getItem('@session_id');
      const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/"+userid+"/friends", {
              'headers': {
                'X-Authorization':  value
              }
            })
            .then((response) => {
                if(response.status === 200){
                    return response.json()
                }else if(response.status === 404){
                  throw"You have no friends currently"; 
                }else{
                    throw 'Something went wrong';
                }
            })
            .then((responseJson) => {
              this.setState({
                listofFriends: responseJson
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
         return (
          <View style={styles.container}>
                <FlatList
                      data={this.state.listofFriends}
                      renderItem={({item}) => (
                          <View>
                            <Text>My Friends</Text>
                            <Text>{item.user_givenname} {item.user_familyname}</Text>
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
          fontSize: 15,
     
         
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
         padding: 7,
     
     
       }
     
     
     
     })







export default Friends; 