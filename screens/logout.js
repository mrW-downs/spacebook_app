import React, { Component } from 'react';
import { Text, View, Button,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            token: ''
        }
    }

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.checkLoggedIn();
        });        
    }

    componentWillUnmount(){
        this._unsubscribe();
    }

    checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if(value !== null) {
          this.setState({token:value});
        }else{
            this.props.navigation.navigate("Login");
        }
    }

    logout = async () => {
        let token = await AsyncStorage.getItem('@session_token');
        await AsyncStorage.removeItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/logout", {
            method: 'post',
            headers: {
                "X-Authorization": token
            }
        })
        .then((response) => {
            if(response.status === 200){
                this.props.navigation.navigate("Login");
            }else if(response.status === 401){
                this.props.navigation.navigate("Login");
            }else{
                throw 'Something went wrong';
            }
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        })
    }

    render(){
        return (
            
            <View style={styles.container}>
                <Text> Have you finished exploring the depths of Spacebook</Text>
                <Text> Are you sure you want to leave?</Text>
                <Button
                    title="Logout"
                    onPress={() => this.logout()}
                />
                <Button
                    title="Abort! Abort!"
                    color="darkblue"
                    onPress={() => this.props.navigation.navigate("Home")}
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
       fontWeight:'bold'
     }
})

export default HomeScreen;