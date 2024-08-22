import React, { useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button } from 'react-native';
import { FormContext } from '../components/FormContext';
import { ThemeContext } from '../components/ThemeContext';

const ProfileScreen = () => {
    const { userDetails, addressDetails, paymentDetails } = useContext(FormContext);
    const { theme, updateTheme } = useContext(ThemeContext);

    const cardNumber = paymentDetails?.cardNumber || '';  

    const handleTextColorChange = (color) => {
        updateTheme({ textColor: color });
    };

    const handleBackgroundColorChange = (color) => {
        updateTheme({ background: color });
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.title, { color: theme.textColor }]}>User Information</Text>
                <Text style={[styles.text, { color: theme.textColor }]}>Name: {userDetails.name}</Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.title, { color: theme.textColor }]}>Address</Text>
                <Text style={[styles.text, { color: theme.textColor }]}>Address: {addressDetails.address}</Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.title, { color: theme.textColor }]}>Payment Details</Text>
                <Text style={[styles.text, { color: theme.textColor }]}>
                    Payment: **** **** **** {cardNumber.slice(-4)}
                </Text>
            </View>

            <View style={styles.themeContainer}>
                <TextInput
                    placeholder="Text Color"
                    placeholderTextColor="#999"
                    onChangeText={handleTextColorChange}
                    style={[styles.input, { borderColor: theme.textColor }]}
                />
                <TextInput
                    placeholder="Background Color"
                    placeholderTextColor="#999"
                    onChangeText={handleBackgroundColorChange}
                    style={[styles.input, { borderColor: theme.textColor }]}
                />
                {/* The Apply Changes button is not needed unless you want to add an explicit action */}
                {/* <Button
                    title="Apply Changes"
                    onPress={() => {
                        // No action needed, TextInput onChangeText will handle the changes
                    }}
                    color={theme.textColor}
                /> */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    card: {
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
    },
    themeContainer: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default ProfileScreen;
