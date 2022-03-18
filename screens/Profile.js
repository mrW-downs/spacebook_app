import React, { Component} from 'react';
import {Text,View,Image,Button,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
class Profile extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            listData: [],
            photo: null,
            listofPosts: [],
            
          
        };
    }
    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
          this.checkLoggedIn();
        });
      
        this.getData();
        this.getProfilepic();
      }
    
      componentWillUnmount() {
        this.unsubscribe();
      }

      getProfilepic =async()=>{
        const userId = await AsyncStorage.getItem('@session_id');
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/"+ userId+"/photo", {
          method: 'GET',
          'headers':{
            'X-Authorization':  value,
            'Content-Type': 'image/png',


          },
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
      .then((resp)=>{
       return resp.blob();


      })
      .then((responseBlob) => {
        console.log(responseBlob);
        let data=URL.createObjectURL(responseBlob)
        
        this.setState({
          photo: data,
          isLoading: false
          
        })
      })
      .catch((error) => {
          console.log(error);
      })
}
      
showPost=async()=>{
  const userId = await AsyncStorage.getItem('@session_id');
  const value = await AsyncStorage.getItem('@session_token');
  const postId= await AsyncStorage.getItem('@post_id');
  return fetch ("http://localhost:3333/api/1.0.0/user/"+userId+"/post/"+postId, {
    'headers' : {
      'X-Authorization':  value,
      'Content-Type':'application/json'
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
      

    .then((responseJson)=> {
      this.setState({
        Post:responseJson
      })
    })

    .catch((error) => {
        console.log(error);
    })

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
      showPost = async () => {
        // Get these from AsyncStorage
    
      const userId = await AsyncStorage.getItem('@session_id');
      const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/"+userId+"/post", {
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
                listofPosts: responseJson
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
            <Image source={{uri: this.state.photo}} 
            
            style={{width: 200,height: 200, border: 3}}/>
            
              <Text>First Name: {this.state.listData.first_name}</Text> 
      
                <Text>Last name: {this.state.listData.last_name} </Text>

            <Text>Email: {this.state.listData.email}</Text>
            <Button title="Edit Profile!"
            onPress={() => this.props.navigation.navigate("Edit")}
                    />
                     <View style={styles.spacing}></View>
                     <Button title="Edit Photo"
            onPress={() => this.props.navigation.navigate("Camerapp")}
                    />
         
                      </View>
                 
       
         
        )
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
    



export default Profile;