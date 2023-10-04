import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../Styles/colors';
import { FontAwesome } from '@expo/vector-icons'

const formatDay = (time) => {
  const date = new Date(time);
  const options = { year: 'numeric', month: 'long', day: 'numeric'};
  return date.toLocaleDateString('es-ES', options);
};


const OrderItem = ({ item, onDelete}) => {
    
    return (
      <View style={styles.order}>
        <View>
          <Text style={styles.date}>{formatDay(item.date)}</Text>
        </View>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <FontAwesome name="trash-o" size={24} color="red" />
        </TouchableOpacity>
      </View>
      ) 
}

export default OrderItem

const styles = StyleSheet.create({
  order: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderColor: colors.beige,
    borderWidth: 1,
    borderRadius: 6
  },
  date: {
    fontSize: 18
  },
  total: {
    fontSize: 18,
    fontFamily: 'LatoRegular',
    color: "#000"
  }
});