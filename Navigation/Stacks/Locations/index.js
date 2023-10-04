import { TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationsScreen from "../../../Screens/LocationsScreen";
import { Ionicons } from '@expo/vector-icons'; 
import { colors } from "../../../Styles/colors";
import SaveLocationScreen from "../../../Screens/SaveLocationScreen";
import GetLocationScreen from "../../../Screens/GetLocationScreen";
import SetLocationScreen from "../../../Screens/SetLocationScreen";


const Stack = createNativeStackNavigator();

const LocatioStack = () => {
    return (
        <Stack.Navigator initialRouteName=""
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.regularBlue
                },
                headerTitleAlign:"center",
                headerTitleStyle: {
                    fontFamily: 'Koulen',
                    fontSize: 28
                },
            }}
        >
            <Stack.Screen 
                name= 'Locations'
                component={LocationsScreen}
                options={({navigation}) => ({
                    title: 'Direcciones',
                    headerRight: () => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate("Save-location")}>
                                <Ionicons name="add-circle-outline" size={24} color="black" />
                            </TouchableOpacity>
                        )
                    }
                })}
            ></Stack.Screen>
             
            <Stack.Screen 
                name="Save-location"
                component={SaveLocationScreen}
                options={{
                    title: 'Guardar Direccion',
                }}
            />

            <Stack.Screen 
                name="Get-location"
                component={GetLocationScreen}
                options={{
                    title: 'Obtener Ubicacion'
                }}
            />

            <Stack.Screen 
                name="Set-location"
                component={SetLocationScreen}
                options={{
                    title: 'Agregar Ubicacion'
                }}
            />

        </Stack.Navigator>
    )
};

export default LocatioStack;