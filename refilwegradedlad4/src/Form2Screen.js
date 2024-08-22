import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { FormContext } from '../components/FormContext';
import { useNavigation } from '@react-navigation/native';

const Form2Screen = () => {
    const { addressDetails, setAddressDetails } = useContext(FormContext);
    const navigation = useNavigation();
    const [errors, setErrors] = useState({});

    const validate = () => {
        let valid = true;
        let newErrors = {};

        if (!addressDetails.address) {
            valid = false;
            newErrors.address = 'Address is required';
        }

        if (!addressDetails.city) {
            valid = false;
            newErrors.city = 'City is required';
        }

        setErrors(newErrors);
        return valid;
    };

    const handleNext = () => {
        if (validate()) {
            navigation.navigate('Form3');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>City:</Text>
            <TextInput
                value={addressDetails.city}
                onChangeText={(text) => setAddressDetails({ ...addressDetails, city: text })}
                style={styles.input}
            />
            {errors.city && <Text style={styles.error}>{errors.city}</Text>}
            
            <Text style={styles.label}>Address:</Text>
            <TextInput
                value={addressDetails.address}
                onChangeText={(text) => setAddressDetails({ ...addressDetails, address: text })}
                style={styles.input}
            />
            {errors.address && <Text style={styles.error}>{errors.address}</Text>}

            <Button title="Next" onPress={handleNext} color="#007BFF" />
        </View>
    );
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
});

export default Form2Screen;
