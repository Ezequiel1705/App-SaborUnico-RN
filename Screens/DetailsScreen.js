import { StyleSheet, Text, View, Image, Button, Dimensions, useWindowDimensions, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../Features/cart';
import { colors } from '../Styles/colors';

const DetailsScreen = ({navigation}) => {

  //const {productId} = route.params
  //const [product, setProduct] = useState(null)

  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  
  const {productSelected} = useSelector(state => state.products.value)
  const [orientation, setOrientation] = useState("portrait")


  useEffect(() => {
    setOrientation(height > width ? 'portrait' : 'landscape')
  }, [height, width])


  const handleAdd = (id) => {
    dispatch(addItem({id: id}))

    Alert.alert(
      'Agregado',
      'El producto se agrego',
      [
        {
          text: 'Ok',
          onPress: () => {
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    productSelected && ( 
      <View style={orientation === "portrait" ? styles.containerVertical : styles.containerHorizontal}>
              <Image
                source={productSelected.image}
                style={styles.image}
                resizeMode="cover"
              />
          <Text style={{alignSelf: 'center'}}>{productSelected.description}</Text>
          <Text style={{alignSelf: 'center'}}>$ {productSelected.price}</Text>
          <Button onPress={() => handleAdd(productSelected.id)} color={colors.darkBlue} title='Agregar al carrito'/>
      </View>
    )
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  containerVertical: {
    flex: 1,
    flexDirection: 'column',
  },
  containerHorizontal: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 0.8 * Dimensions.get('window').width,
    height: 300,
    marginTop: 30,
    right: -40,
    borderRadius: 12
  },
})