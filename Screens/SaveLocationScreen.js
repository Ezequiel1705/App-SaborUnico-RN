import { Button, Image, Pressable, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { colors } from '../Styles/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { addLocation } from '../Features/locations';


const SaveLocationScreen = ({navigation, route}) => {

    const [ title, setTitle ] = useState("");
    const [ picture, setPicture ] = useState("");

    const params = route.params;
    console.log(params?.address)

    const dispatch = useDispatch();

    const handlePickLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        
        console.log(result);

        if (!result.canceled) {
            setPicture(result.uri);
        }
    };

    const getPermission = async () => {
        const {status} = await ImagePicker.getCameraPermissionsAsync();

        console.log(status);
        if (status !== 'granted') {
            return false
        }
        return true
    };

    const handleTakePicture = async () => {
        const isVerified = getPermission()
        if (!isVerified) {
            return
        }

        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1
        })

        console.log(image);
        setPicture(image.uri);
    };

    const handleConfirm = async () => {
        dispatch(addLocation({title, picture, id: Date.now(), address:params?.address}))
        setTitle("");
        setPicture("");
    };

    const handleLocation = () => {
        navigation.navigate("Get-location")
    };

    const handleSetLocation = () => {
        navigation.navigate("Set-location")
    };


  return (
    <View style={styles.container}>
      <Text>Nueva dirección</Text>
      <TextInput 
        value={title}
        onChangeText={setTitle}
        placeholder='Ingrese Titulo'
        style={styles.textInput}
      />
      {picture ? 
        <Image 
        source={{uri: picture}}
            style={styles.image}
        />
        : null
        }
        
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
                <Text style={{color: '#000', fontSize: 16}}>Tomar foto</Text>
                <MaterialCommunityIcons name="camera-marker" size={24} color={colors.darkBlue} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handlePickLibrary} >
                <Text style={{color: '#000', fontSize: 16}}>Seleccionar de la galeria</Text>
                <Entypo name="images" size={24} color={colors.darkBlue} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLocation}>
                <Text style={{color: '#000', fontSize: 16}}>Obtener Ubicación</Text>
                <MaterialIcons name="my-location" size={24} color={colors.darkBlue} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSetLocation}>
                <Text style={{color: '#000', fontSize: 16}}>Agregar Ubicación</Text>
                <MaterialIcons name="add-location-alt" size={24} color={colors.darkBlue} />
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                <Text style={{color: '#000', fontSize: 16}}>Confirmar</Text>
                <AntDesign name="check" size={24} color={colors.darkBlue} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default SaveLocationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: '90%',
        height: 150 ,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: colors.beige,
        //marginBottom: 20
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        //borderTopEndRadius: 30,
        marginVertical: 2,
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
    textInput:{
        width:'90%',
        height: 40,
        textAlign: 'center',
        fontSize: 20,
        margin: 8,
        borderRadius: 5,
        backgroundColor: colors.beige,
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'column',
        //justifyContent: 'space-between',
        width: '100%',
        //paddingHorizontal: 1,
        marginVertical: 20
        
    }
})