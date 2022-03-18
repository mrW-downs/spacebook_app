import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import logout from './screens/logout';
import Profile from './screens/Profile';
import Edit from './screens/Edit';
import Camerapp from './screens/Camerapp';
import Friends from './screens/friends';
import Friendrequest from './screens/friendrequest';
import CreatePost from './screens/CreatePost';


function Homescreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      onPress={() => navigation.navigate('Login')}
    </View>
  );
}
function LoginScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Login!</Text>
        onPress={() => navigation.navigate('Signup')}

       
      </View>
    );
  }


const nav = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      
      <nav.Navigator> 
        <nav.Screen name="Login" component={Login} />
        <nav.Screen name="Signup" component={Signup} />
        <nav.Screen name="Home" component={Home} />
        <nav.Screen name="Logout" component={logout} />
        <nav.Screen name="Profile" component={Profile} />
        <nav.Screen name="Edit" component={Edit} />
        <nav.Screen name="Camera" component={Camerapp} />
        <nav.Screen name="Friends" component={Friends} />
        <nav.Screen name="Friend Requests" component={Friendrequest} />
        <nav.Screen name="CreatePost" component={CreatePost} />


        </nav.Navigator>

     
    </NavigationContainer>
  );
}

