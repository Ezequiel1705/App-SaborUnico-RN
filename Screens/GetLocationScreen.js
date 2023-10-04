import { StyleSheet, Text, View, Image, Button, Pressable, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import * as Location from 'expo-location';
import { API_KEY } from '../Constants/googleAPI';
import { colors } from '../Styles/colors';

//https://developers.google.com/maps/documentation/maps-static/start DOC API
//https://developers.google.com/maps/documentation/maps-static/start#Markers Markers DOC


const GetLocationScreen = ({navigation}) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [address, setAddress] = useState(null);
    const [photo, setPhoto] = useState(null);

    const [isPressed, setIsPressed] = useState(false);

    //Efecto para traer la ubicación apenas renderiza
    useEffect(() => {
      //IIFE
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});

        console.log(location);
        setLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        })
      })();

    }, []);


    //Efecto para traer el mapa y luego hacer un reverse geoCode a partir de las coordenadas
    useEffect(() => {
      if (location?.lat) {

        (async () => {
          console.log("Entro");
          // console.log(location);
          //Seteamos la url de la foto
          setPhoto(`https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=13&size=600x600&maptype=roadmap&markers=color:red%7Clabel:C%7C${location.lat},${location.lng}&key=${API_KEY}`)
          //Reverse geocode
          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${API_KEY}`)
          //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
          const reverseGeocode = await response.json()
          console.log(reverseGeocode);
          const address = reverseGeocode.results[0].formatted_address;
          setAddress(address);
        })()
        
      }
    }, [location]);

    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }

    // console.log(photo);
    const handleConfirmLocation = () => {
      navigation.navigate("Save-location", {address})
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coordenadas:</Text>
      <Text style={styles.paragraph}>{text}</Text>
      <View>
        {photo ?
          <Image
            source={{ uri: photo }}
            style={{ width: 500, height: 400 }}
          />
          : null
        }
        {
          address ?
          <>
            <Text>{address}</Text>
            <TouchableOpacity
                onPress={handleConfirmLocation}
                style={[styles.button, isPressed && styles.buttonPressed]}
              >
              <Text style={styles.buttonText}>Confirmar dirección</Text>
            </TouchableOpacity>
          </>
          :
          null
        } 
      </View>
    </View>
  )
}

export default GetLocationScreen

const styles = StyleSheet.create({
  paragraph:{
    fontSize:20,
  },
  title: {
    fontSize:26,
    textAlign: 'center',
    fontFamily: 'LatoRegular',
    margin: 10
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    //borderTopEndRadius: 30,
    marginVertical: 10,
    //flex: 1,
    shadowColor: colors.neoFullBlue,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    /* position: "absolute", */
    borderRadius: 15,
    height: 50,
  },
  buttonPressed: {
    backgroundColor: 'red', // Cambia el color cuando se presiona
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center'
  },
})