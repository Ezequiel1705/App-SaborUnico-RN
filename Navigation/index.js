import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigatorLogged from './Tabs/UserLogged'
import AuthStack from './Stacks/Auth'
import { useSelector } from 'react-redux'

const MainNavigator = () => {

  /* const [user, setUser] = useState(true); */
  const {user} = useSelector(state => state.auth.value)
  console.log(user)


  return (
    <NavigationContainer>
      { user.email ?
      <TabNavigatorLogged />
      : 
      <AuthStack />
      }
    
    </NavigationContainer>
  )
}

export default MainNavigator

const styles = StyleSheet.create({})