import React, { Component } from 'react';
import { Button, View, TextInput,StyleSheet,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
class CreatePost extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading:'true',
            createPosting: [],
        }
    }
    
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
       
    SubmittoWall = async () => {
        //Validation here...
           const userid = await AsyncStorage.getItem('@session_id');
            const value = await AsyncStorage.getItem('@session_token');
            return fetch ("http://localhost:3333/api/1.0.0/user/"+userid+"/post", {
                method: 'POST',
                'headers' : {
                'X-Authorization':  value,
                'Content-Type':'application/json'
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
                  
    
                .then((responseJson)=> {
                  this.setState({
                      isLoading:false,
                    createPosting:responseJson
                  })
                })
      
                .catch((error) => {
                    console.log(error);
                }
                )
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
             
                <TextInput
                   style={styles.Text}
                    placeholder="Enter your message"
                    onChangeText={(createPosting) => this.setState({createPosting})}
                    value={this.state.createPosting}
                />
                <Button
                    title="Blast off!"
                    onPress={() => this.SubmittoWall()}
                />
             
            </View>
        )
    }
}
const styles = StyleSheet.create({
 Button:{
    backgroundColor: 'orange',
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

export default CreatePost;