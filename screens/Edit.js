import React, { Component } from 'react';
import { Button, ScrollView, TextInput, TouchableNativeFeedbackComponent } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Edit extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            listData: [],
            first_name: "",
            last_name: "",
            email: "",
            password: "" 
            
            
        }
    }
  




    edituser = async () => {
        //Validation here...
        const userId = await AsyncStorage.getItem('@session_id');
            const value = await AsyncStorage.getItem('@session_token');
            return fetch ("http://localhost:3333/api/1.0.0/user/"+ userId, {
                method: 'PATCH',
                'headers' : {
                'X-Authorization':  value,
                'Content-Type':'application/json',
                },

                body: JSON.stringify({
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email,
                    password: this.state.password,



                })
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
        return (
            <ScrollView>
                <TextInput
                    placeholder="Edit your first name..."
                    onChangeText={(first_name) => this.setState({first_name})}
                    value={this.state.first_name}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <TextInput
                    placeholder="Enter your last name..."
                    onChangeText={(last_name) => this.setState({last_name})}
                    value={this.state.last_name}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <TextInput
                    placeholder="Edit your email..."
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <TextInput
                    placeholder="Edit your password..."
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    secureTextEntry
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <Button
                    title="Confirm Details"
                    onPress={() => this.edituser()}
                />
                 <Button
                    title="Back to Profile"
                    onPress={() => this.props.navigation.navigate('Profile')}
                />

            </ScrollView>
        )
    }
}

export default Edit;