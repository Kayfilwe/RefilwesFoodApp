import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { FormContext } from '../components/FormContext';
import { useNavigation } from '@react-navigation/native';

const Form3Screen = () => {
    const { paymentDetails, setPaymentDetails } = useContext(FormContext);
    const navigation = useNavigation();
    const [errors, setErrors] = useState({});
    const [cardType, setCardType] = useState('');

    const validate = () => {
        let valid = true;
        let newErrors = {};

        if (!paymentDetails.cardNumber || !/^\d{16}$/.test(paymentDetails.cardNumber)) {
            valid = false;
            newErrors.cardNumber = 'Valid card number (16 digits) is required';
        }

        if (!paymentDetails.expiryMonth || !paymentDetails.expiryYear) {
            valid = false;
            newErrors.expiry = 'Expiry date (MM/YYYY) is required';
        } else {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1;
            const expiryYear = parseInt(paymentDetails.expiryYear, 10);
            const expiryMonth = parseInt(paymentDetails.expiryMonth, 10);

            if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
                valid = false;
                newErrors.expiry = 'Card is expired';
            }
        }

        if (!paymentDetails.cvv || !/^\d{3}$/.test(paymentDetails.cvv)) {
            valid = false;
            newErrors.cvv = 'Valid CVV (3 digits) is required';
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = () => {
        if (validate()) {
            console.log('Form submitted successfully');
            navigation.navigate('Profile'); 
        }
    };

    const handleCardNumberChange = (text) => {
        setPaymentDetails({ ...paymentDetails, cardNumber: text });
        updateCardType(text);
    };

    const updateCardType = (number) => {
        const cardNumber = number.replace(/\D/g, '');
        if (cardNumber.startsWith('4')) {
            setCardType('Visa');
        } else if (cardNumber.startsWith('5')) {
            setCardType('MasterCard');
        } else if (cardNumber.startsWith('3')) {
            setCardType('American Express');
        } else {
            setCardType('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Card Number:</Text>
            <TextInput
                value={paymentDetails.cardNumber}
                onChangeText={handleCardNumberChange}
                style={styles.input}
                keyboardType="numeric"
                maxLength={16}
            />
            {errors.cardNumber && <Text style={styles.error}>{errors.cardNumber}</Text>}
            
            <Text style={styles.label}>Expiry Month (MM):</Text>
            <TextInput
                value={paymentDetails.expiryMonth}
                onChangeText={(text) => setPaymentDetails({ ...paymentDetails, expiryMonth: text })}
                style={styles.input}
                keyboardType="numeric"
                maxLength={2}
            />
            {errors.expiry && <Text style={styles.error}>{errors.expiry}</Text>}
            
            <Text style={styles.label}>Expiry Year (YYYY):</Text>
            <TextInput
                value={paymentDetails.expiryYear}
                onChangeText={(text) => setPaymentDetails({ ...paymentDetails, expiryYear: text })}
                style={styles.input}
                keyboardType="numeric"
                maxLength={4}
            />
            {errors.expiry && <Text style={styles.error}>{errors.expiry}</Text>}
            
            <Text style={styles.label}>CVV:</Text>
            <TextInput
                value={paymentDetails.cvv}
                onChangeText={(text) => setPaymentDetails({ ...paymentDetails, cvv: text })}
                style={styles.input}
                keyboardType="numeric"
                maxLength={3}
            />
            {errors.cvv && <Text style={styles.error}>{errors.cvv}</Text>}
            
            <Text style={styles.cardTypeLabel}>Card Type: {cardType}</Text>
            {cardType && <Image source={{ uri: getCardImageUri(cardType) }} style={styles.cardImage} />}
            
            <Button title="Submit" onPress={handleSubmit} color="#007BFF" />
        </View>
    );
};

// Helper function to get card image URL based on card type
const getCardImageUri = (type) => {
    switch (type) {
        case 'Visa':
            return 'https://example.com/visa-logo.png'; // Replace with actual URL
        case 'MasterCard':
            return 'https://example.com/mastercard-logo.png'; // Replace with actual URL
        case 'American Express':
            return 'https://example.com/amex-logo.png'; // Replace with actual URL
        default:
            return '';
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F9FA',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    cardTypeLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 20,
    },
    cardImage: {
        width: 100,
        height: 60,
        marginTop: 10,
    },
});

export default Form3Screen;
