import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import CartItem from '../Compenents/CartItem'
import { colors } from '../Styles/colors'
import { useSelector, useDispatch } from 'react-redux'
import { confirmPurchase, removeItem } from '../Features/cart'


const CartScreen = () => {

  const [cartItems, setCartItems ] = useState([])
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cart.value)
  console.log(cart)

  const renderItem = (data) => {
    return <CartItem item={data.item} onDelete={handleDelete}/>
  };

  const handleDelete = (id) => {
    const updateCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updateCartItems); 
    console.log(`Se elimina del carrito el producto con id: ${id}`)
    dispatch(removeItem(id))
  };

  const handleConfirm = () => {
    dispatch(confirmPurchase(cart))
    //dispatch(getOrders());

    Alert.alert(
      'Confirmación Exitosa',
      'El producto ha sido confirmado.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Aquí puedes realizar alguna acción adicional si es necesario.
          },
        },
      ],
      { cancelable: false }
    );


  }

  //const total = 1630;
  const total = cart.reduce((accumulator, item) => accumulator + item.price, 0)

  return (
    <View style={styles.container}> 
      <View style={styles.list}>
        <FlatList 
          data={cart}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirm} onPress={handleConfirm}>
          <Text>Confirmar</Text>
          <View style={styles.total}>
            <Text style={styles.text}>Total</Text>
            <Text style={styles.text}>${total.toFixed(2)}</Text>
          </View>
          
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    paddingBottom: 120
  },
  list: {
    flex: 1
  },
  footer: {
    padding: 12,
    borderTopColor: colors.beige,
    borderTopWidth: 1
  },
  confirm: {
    backgroundColor: colors.beige,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  total: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 18,
    fontFamily: 'LatoRegular',
    padding: 8
  }
})
