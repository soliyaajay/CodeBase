import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import MainTabs from './MainTabs';

import Splash from '../../src/screens/Spash';
import Onboard from '../../src/screens/Onboard';
import Login from '../../src/screens/Login';
import ForgotPassword from '../../src/screens/ForgotPassword';
import Signup from '../../src/screens/Signup';
import Home from '../../src/screens/Home';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{  }}>
            <Stack.Screen name='Splash' component={Splash} options={{ title: 'Splash', headerShown: false, }} />
            <Stack.Screen name='Onboard' component={Onboard} options={{ title: 'Onboard', headerShown: false, }} />
            <Stack.Screen name='Login' component={Login} options={{ title: 'Login', headerShown: false, }} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{ title: 'Password reset' }} />
            <Stack.Screen name='Signup' component={Signup} options={{ title: 'Create Account' }} />
            <Stack.Screen name='Home' component={Home} options={{ title: 'Home', headerShown: false, gestureEnabled: false }} />
            {/* <Stack.Screen name='MainTabs' component={MainTabs} /> */}
        </Stack.Navigator>
    );
}

export default AppNavigator;