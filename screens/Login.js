import React, { Component } from 'react';
import { Button,StyleSheet,View,Image } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    login = async () => {

        //Validation here...

        return fetch("http://localhost:3333/api/1.0.0/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 400){
                throw 'Invalid email or password';
            }else{
                throw 'Something went wrong';
            }
        })
        .then(async (responseJson) => {
                console.log(responseJson);
                await AsyncStorage.setItem('@session_id', responseJson.id);
                await AsyncStorage.setItem('@session_token', responseJson.token);
                this.props.navigation.navigate("Home");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render(){
        return (
            <View style={styles.container}>
               <Image
                style={styles.rocket}
        
          source={require("./rocket.png")}
        />
         <View style={styles.spacing} /> 
                <TextInput
                    placeholder="Enter your email..."
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <TextInput
                 style={styles.Text}
                    placeholder="Enter your password..."
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    secureTextEntry
                   
                />
                <Button
                 style={styles.button2}
                    title="Login"
                    onPress={() => this.login()}
                />
                <View style={styles.spacing} /> 
                <Button
                style={styles.button1}
                    title="Don't have an account?"
                    onPress={() => this.props.navigation.navigate("Signup")}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    button1:{
        fontSize: 15,
        width: "46%",
   
       
    },
    button2:{
        color: 'darkorange',
         fontSize: 15,
         width: "46%",
    
        
     },
     rocket:{
        height: 200,
        width: 200

   
       
    },
      spacing:{
         height: 10,
 
    
        
     },

    container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       flexDirection:'column',
       padding:'5',
       backgroundColor: 'darkslateblue',
   
     },
     Text:{
       margin: 10,
       height: 35,
       borderWidth: 1,
       padding: 7,
     
     }
})
   




export default Login;