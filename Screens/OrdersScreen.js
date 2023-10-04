import { FlatList, StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect } from 'react'
import OrderItem from '../Compenents/OrderItem'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, deleteOrder } from '../Features/orders'


const OrdersScreen = ({item}) => {
  
  const dispatch = useDispatch();
  const {orders, loading, error} = useSelector(state => state.orders.value);
  //const {user} = useSelector(state => state.auth.value)

  console.log(orders)
  
  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId))
    .then(() => {
      // La orden se eliminó con éxito (puede actualizar la interfaz de ser necesario).
      // También puedes mostrar un mensaje de éxito.
    })
    .catch((error) => {
      // Se produjo un error al eliminar la orden.
      console.error('Error al eliminar la orden:', error);
    });
  };

  const convertStringToDate = (dateString) => {
    if (dateString) {
      const parts = dateString.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
    }
    return null;
  };
  
  
  useEffect(() => {
    dispatch(getOrders())
  }, []) 
  
  
  return (
    <View style={styles.container}>
    {loading ? (
      <Text>Cargando pedidos...</Text>
      ) : error ? (
        <Text>Error al cargar los pedidos</Text>
        ) : orders.length > 0 ? (
          <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <OrderItem 
            item={{ 
              date: convertStringToDate(item.date),
            }}
            onDelete={() => handleDeleteOrder(item.id)}
            />
          )}
          />
          ) : (
          <Text>No hay órdenes disponibles</Text>
        )}
              
    </View>
  )
}
            
export default OrdersScreen
            
const styles = StyleSheet.create({
  container: {
      flex: 1
    }
});