import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../components/CartContext';

const CartScreen = () => {
  const { cartItems, removeFromCart, getTotalPrice } = useContext(CartContext);
  const navigation = useNavigation();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart Empty', 'Your cart is empty. Please add items to the cart before proceeding.');
    } else {
      navigation.navigate('Form1');
    }
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Price: R{item.price}</Text>
              <Button title="Remove" onPress={() => removeFromCart(item)} />
            </View>
          )}
        />
      )}
      {cartItems.length > 0 && (
        <Text style={styles.totalText}>Total: R{getTotalPrice()}</Text>
      )}
      <Button title="Proceed to Checkout" onPress={handleCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    marginVertical: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default CartScreen;
