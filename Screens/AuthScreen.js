import { Button, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../Styles/colors'
import Input from '../Compenents/Input'
import { useDispatch } from 'react-redux'
import { login, signUp } from '../Features/auth'
import loginValidationSchema from '../Utils/validationYup'
import {Formik} from 'formik';

const background = require("../assets/backgrounCoff.jpg")

const LoginScreen = () => {

    const [registroVista, setRegistroVista] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const dispatch = useDispatch()

   
    const handleSubmit = (values) => {
        console.log(values);
        console.log("Se submiteo un form válido");
        if (registroVista) {
            if (values.password === values.confirmPassword) {
                console.log("Se registra!");
                dispatch(signUp({ email: values.email, password: values.password }))
            } else {
                setConfirmPasswordError("Los passwords deben coincidir")
            }
        }
        else {
            console.log("Entra al login");
            dispatch(login({ email: values.email, password: values.password }));
        }
    }

    return (
        <View style={styles.container}>
            <Image source={background} style={styles.background}/>
            <View style={styles.content}>
                <Text style={styles.title}>{registroVista ? "Registro" : "Login"}</Text>
                <Formik 
                    onSubmit={handleSubmit}
                    initialValues={{email: "", password: "", confirmPassword: ""}}
                    validationSchema = {loginValidationSchema}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                >   
                    {({handleChange, errors, handleSubmit, values, handleBlur}) => (
                        <>
                            <Input label="Email" password={false} onChange={handleChange('email')} value={values.email} error={errors.email} onBlur={handleBlur('email')}/>
                            <Input label="Password" password={true} onChange={handleChange('password')} value={values.password} error={errors.password} onBlur={handleBlur('password')}/>
                            {registroVista && <Input label="Confirm password" password={true} onChange={handleChange('confirmPassword')} value={values.confirmPassword} onBlur={handleBlur('confirmPassword')} error={confirmPasswordError}/>}
                            {registroVista ?
                                <Pressable style={styles.buttonSignUp} onPress={handleSubmit}><Text style={{fontSize: 20}}>SignUp</Text></Pressable>
                                :
                                <Pressable style={styles.buttonLogin} onPress={handleSubmit}><Text style={{fontSize: 20}}>Login</Text></Pressable>
                            }
                            <View style={styles.textContainer}>
                                {registroVista ?
                                    <TouchableOpacity onPress={() => setRegistroVista(false)}>
                                        <Text>¿Ya tienes cuenta? <Text
                                            style={styles.link}
                                        >Login</Text></Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => setRegistroVista(true)}
                                    >
                                        <Text>¿No tienes cuenta? <Text
                                            style={styles.link}
                                        >¡Crea una!</Text></Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </>
                    )}
                </Formik>

            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    background: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: "cover"
    },
    content: {
        borderTopLeftRadius: 60,
        bottom: 0,
        width: '100%',
        height: '50%',
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        /* borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12, */
    },
    title: {
        fontFamily: 'Koulen',
        fontSize: 30,
        textAlign: 'center',
        color: colors.darkBlue
    },
    textContainer: {
        padding: 10,
        fontFamily: 'LatoRegular',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    buttonSignUp:{
        backgroundColor: colors.neoFullBlue,
        height: 58,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
    },
    buttonLogin: {
        backgroundColor: colors.neoFullBlue,
        height: 58,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
    },
    link: {
        color: 'blue',
        textDecorationLine: "underline"
    }
})