import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import List from '../Compenents/List'
import { Entypo } from '@expo/vector-icons';
import Searcher from '../Compenents/Searcher';
import { colors } from '../Styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../Features/categories';
import { setProductsByCategory } from '../Features/products';

const CategoriesScreen = ({navigation}) => {

  const [input, setInput] = useState("")
  const [categoriesFilter, setCategoriesFilter] = useState()

  const dispatch = useDispatch()
  //const categoriesState = useSelector(state => state.categories)

  const {categories} = useSelector(state => state.categories.value)
  
  useEffect(() => {
    if(input === "") setCategoriesFilter(categories)
    else{
      console.log('Se ejercuta el efect');
      const categoriasFiltradas = categories.filter(category => category.category.toLowerCase().includes(input.toLowerCase()))
      setCategoriesFilter(categoriasFiltradas)
    }
  }, [input]);

  const handleErase = () => {
    setInput("");
  };

  const handleSelectedCategory = (category) =>{

    dispatch(setProductsByCategory(category.id))
    dispatch(selectCategory(category.id));
  
    navigation.push("Products", {
      categoryId: category.id,
      categoryTitle: category.category
    })
  };

  return (
    <>
    <View style={styles.container}>
      <Searcher additionalStyle={{
          backgroundColor: colors.regularBlue,
        }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          keyboardType='default'
          style={styles.input}
          placeholder='Ingrese categoria'
        />
        <TouchableOpacity onPress={handleErase}>
          <Entypo name='erase' size={30} color={colors.darkBlue}/>
        </TouchableOpacity>
      </Searcher>
      <View style={styles.listContainer}>
        <List data={categoriesFilter} onPress={handleSelectedCategory}/>
      </View>
    </View>
    </>
  )
}

export default CategoriesScreen;

const styles = StyleSheet.create({
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
    backgroundColor: colors.greyLight,
    borderRadius: 10,
    color: '#000',
    height: 50,
  },
  listContainer:{
    flex: 1,
  }
});