import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductItem = ({product}) => {
  
  return (
    <View>
      <Image source={product.image} style={styles.image}/>
      <Text style={{fontFamily: 'Koulen'}}>{product.description}</Text>
    </View>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    borderRadius: 10
  }
})