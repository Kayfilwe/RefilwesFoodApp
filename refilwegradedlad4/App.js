import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CartProvider } from './components/CartContext';
import { FormProvider } from './components/FormContext';
import { CustomThemeProvider } from './components/ThemeContext';
import MenuScreen from './src/MenuScreen';
import WelcomeScreen from './src/WelcomeScreen';
import CartScreen from './src/CartScreen';
import ProfileScreen from './src/ProfileScren';
import Form1Screen from './src/Form1Sreen';
import Form2Screen from './src/Form2Screen';
import Form3Screen from './src/Form3Screen'; 

const Stack = createStackNavigator();

const App = () => {
    return (
        <CustomThemeProvider>
            <CartProvider>
                <FormProvider>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="Welcome">
                            <Stack.Screen name="Welcome" component={WelcomeScreen} />
                            <Stack.Screen name="Menu" component={MenuScreen} />
                            <Stack.Screen name="Cart" component={CartScreen} />
                            <Stack.Screen name="Profile" component={ProfileScreen} />
                            <Stack.Screen name="Form1" component={Form1Screen} />
                            <Stack.Screen name="Form2" component={Form2Screen} />
                            <Stack.Screen name="Form3" component={Form3Screen} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </FormProvider>
            </CartProvider>
        </CustomThemeProvider>
    );
};

export default App;
