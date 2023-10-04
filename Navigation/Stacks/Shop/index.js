import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import CategoriesScreen from '../../../Screens/CategoriesScreen.js';
import ProductsScreen from '../../../Screens/ProductsScreen.js'
import DetailsScreen from '../../../Screens/DetailsScreen.js'
import { colors } from '../../../Styles/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

function ShopNavigator ({navigation}) {
    
    const handleNavigateToAuth = () => {
        navigation.navigate('AuthScreen')
    }

    return (
            <Stack.Navigator initialRouteName='Inicio'
                screenOptions={{
                    headerShown: true,
                    haderStyle: {
                        backgroundColor:'#1F8A70',
                    },
                    headerTintColor:"#000",
                    headerTitleStyle: {
                        fontFamily: "Koulen",
                        fontSize: 30,
                    },
                    headerTitleAling: "center"
                }}
            >
                <Stack.Screen 
                    name='Categories'
                    component={CategoriesScreen}
                    options={() => ({
                        title: 'Categorias',
                        headerRight: () => {
                            return (
                                <TouchableOpacity onPress={handleNavigateToAuth}>
                                    <MaterialCommunityIcons name="exit-to-app" size={30} color="black" />
                                </TouchableOpacity>
                            )
                        }
                    })}
                />
        
                <Stack.Screen 
                    name='Products'
                    component={ProductsScreen}
                    options={({route}) => ({
                        title: route.params.categoryTitle,
                        headerStyle: {
                            backgroundColor: route.params.categoryTitle === "Bebidas Calientes" ? colors.regularBlue :
                                route.params.categoryTitle === "Cocteleria" ? "violet" : 
                                    colors.regularBlue
                        }
                    })} 
                />
                <Stack.Screen 
                    name='Detail'
                    component={DetailsScreen}
                    options={({route}) => ({
                        title: route.params.productTitle,
                        headerTintColor: '#000',
                        headerStyle: {
                            backgroundColor: colors.regularBlue
                        }
                    })} 
                />
            </Stack.Navigator>
    );
}

export default ShopNavigator;

const styles = StyleSheet.create({})

