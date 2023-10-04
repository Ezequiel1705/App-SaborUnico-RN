import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { colors } from '../../../Styles/colors';
import AuthScreen from '../../../Screens/AuthScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName=""
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.regularBlue
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontFamily: 'Koulen',
                fontSize: 18,
            },
            headerTitleAlign: 'center'
        }}
    >
        <Stack.Screen
            name='auth'
            component={AuthScreen}
            options={{
                title: 'Auth',
                headerShown: false
            }}
        >
        </Stack.Screen>
    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})