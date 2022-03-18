import React, { Component } from 'react';
import { Button, View, TextInput,StyleSheet,Image} from 'react-native';

class SignupScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: ""
        }
    }

    signup = () => {
        //Validation here...

        return fetch("http://localhost:3333/api/1.0.0/user", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then((response) => {
            if(response.status === 201){
                return response.json()
            }else if(response.status === 400){
                throw 'Failed validation';
            }else{
                throw 'Something went wrong';
            }
        })
        .then((responseJson) => {
               console.log("User created with ID: ", responseJson);
               this.props.navigation.navigate("Login");
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
               
             
                <TextInput
                   style={styles.Text}
                    placeholder="Enter your first name..."
                    onChangeText={(first_name) => this.setState({first_name})}
                    value={this.state.first_name}
                />
                <TextInput
                    style={styles.Text}
                    placeholder="Enter your last name..."
                    onChangeText={(last_name) => this.setState({last_name})}
                    value={this.state.last_name}
                   
                />
                <TextInput
                    style={styles.Text}
                    placeholder="Enter your email..."
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                   
                />
                <TextInput
                     style={styles.Text}
                    placeholder="Enter your password..."
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    secureTextEntry
                />
                <Button
                    title="SignUp"
                    onPress={() => this.signup()}
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
 rocket:{
    height: 200,
    width: 200
   
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

export default SignupScreen;
