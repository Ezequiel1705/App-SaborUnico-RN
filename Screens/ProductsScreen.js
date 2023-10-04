import {  Button, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Entypo } from '@expo/vector-icons';
import List from '../Compenents/List';
import { colors } from '../Styles/colors';
import Searcher from '../Compenents/Searcher';
import { useDispatch, useSelector } from 'react-redux';
import { setProductSelected } from '../Features/products';

const ProductsScreen = ({category = { id: 1, category: "Bebidas Calientes"}, navigation, route}) => {

  const [input, setInput] = useState("");
  const [productsFiltered, setProductsFiltered] = useState([])
  const {productsByCategory} = useSelector(state => state.products.value)

  const dispatch = useDispatch();

  const {categoryId} = route.params
 
  useEffect(() => {
    if (productsByCategory.length !== 0) {
        if (input === "") setProductsFiltered(productsByCategory)
        else {
            const productosFiltrados = productsByCategory.filter(product => product.description.toLowerCase().includes(input.toLowerCase()))
            setProductsFiltered(productosFiltrados)
        }
    }
  }, [input, productsByCategory])


  /* useEffect(() => {
    const productosIniciales = PRODUCTS.filter(product => product.category === categoryId)
    setInitialProducts(productosIniciales);
  }, [categoryId]) */

  const handleErase = () => {
    setInput("")
  }

  const handleDetailProduct = (product) => {
    console.log(product);
    dispatch(setProductSelected(product.id))

    navigation.navigate("Detail", {
      categoryTitle: category.category
    })
  }

  /* const handleBack = () => {
    navigation.goBack();
  } */

  return (
    <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoid}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Searcher additionalStyle={{
                      backgroundColor: colors.regularBlue
                    }}>
                      <TextInput 
                        value={input}
                        onChangeText={setInput}
                        keyboardType='default'
                        style={styles.input}
                        placeholder={'Buscar Producto'}
                      />
                      <TouchableOpacity onPress={handleErase}>
                        <Entypo name='erase' size={30} color={colors.darkBlue}/>
                      </TouchableOpacity>
                    </Searcher>
                    <View style={styles.listContainer}>
                        <List data={productsFiltered} itemType={"Producto"} onPress={handleDetailProduct} />
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
  )
}

export default ProductsScreen

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    color: '#000',
    height: 50,
  },
  listContainer: {
    flex: 1,
  }
})