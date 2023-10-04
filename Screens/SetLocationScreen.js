import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import MapView  from 'react-native-maps'
import { Marker } from 'react-native-maps'
import { API_KEY } from '../Constants/googleAPI'
import * as Location from 'expo-location';
import { colors } from '../Styles/colors'


const SetLocationScreen = ({navigation}) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    const initialRegion = {
        latitude: -35.0000000,
        longitude: -65.0000000,
        latitudeDelta: 10,
        longitudeDelta: 10
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
        })()

    }, [])


    const handleLocation = evento => {
        setLocation({
            lat: evento.nativeEvent.coordinate.latitude,
            lng: evento.nativeEvent.coordinate.longitude,
        })
    }


    const handleConfirm = () => {
        //Reverse geocode
        (async ()=> {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${API_KEY}`)
            const reverseGeocode = await response.json()
            console.log(reverseGeocode);
            const address = reverseGeocode.results[0].formatted_address;
            navigation.navigate('Save-location', {address})
        })()
    }

    console.log(errorMsg);
    console.log(location);

  return (
    <>
            {errorMsg ?
                <Text>{errorMsg}</Text>
                :
                <>
                    <MapView onPress={handleLocation} initialRegion={initialRegion} style={{width: 400, height: 500}}> 
                        {location?.lat ?
                        <Marker 
                            title="Ubicación seleccionada"
                            coordinate={{
                                latitude: location.lat,
                                longitude: location.lng,
                            }}
                        
                        />
                        :
                        null

                        }

                    </MapView>
                    <TouchableOpacity style={styles.Button} onPress={handleConfirm}>
                        <Text style={styles.buttonText}>Confirmar dirección</Text>
                    </TouchableOpacity>
                </>
            }
        </>
  )
}

export default SetLocationScreen;

const styles = StyleSheet.create({
    Button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        marginVertical: 10,
        shadowColor: colors.neoFullBlue,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        borderRadius: 15,
        height: 50,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center'
    },
})