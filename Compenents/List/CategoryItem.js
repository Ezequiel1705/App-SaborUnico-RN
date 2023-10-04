import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dimensions, useWindowDimensions } from 'react-native';
import { colors } from '../../Styles/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CategoryItem = ({category}) => {

  const {width, height} = useWindowDimensions();

  // console.log(windowWidth, windowHeight);
  //console.log(width, height)

  return (
    <View style={{...styles.container, 
      maxWidth: 0.43 * width,
      maxHeight: 0.43 * width,
      margin: width < 330 ? 10: 15,
    }}>
      <Text style={styles.text}>{category.category}</Text>
      <Image source={category.image} style={{...styles.image,
        maxWidth: 0.43 * width,
        maxHeight: 0.43 * width,
       }}/>
    </View>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 15,
    backgroundColor: colors.regularBlue,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: 'LatoRegular'
  },
  image:{
    width: 60,
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 50,
  }
}
)