import React from 'react';
import { CartProvider } from './components/CartContext';
import { NavigationContainer } from '@react-navigation/native';
// Import your screens here

const App = () => {
    return (
        <CartProvider>
            <NavigationContainer>
                {/* Your navigation stack goes here */}
            </NavigationContainer>
        </CartProvider>
    );
};

export default App;
