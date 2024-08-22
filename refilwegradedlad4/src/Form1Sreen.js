import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { FormContext } from '../components/FormContext';
import { useNavigation } from '@react-navigation/native';

const Form1Screen = () => {
    const { userDetails, setUserDetails } = useContext(FormContext);
    const navigation = useNavigation();
    const [errors, setErrors] = useState({});

    const validate = () => {
        let valid = true;
        let newErrors = {};

        if (!userDetails.name) {
            valid = false;
            newErrors.name = 'Name is required';
        }

        if (!userDetails.email || !/\S+@\S+\.\S+/.test(userDetails.email)) {
            valid = false;
            newErrors.email = 'Valid email is required';
        }

        if (!userDetails.phone || !/^\d{10}$/.test(userDetails.phone)) {
            valid = false;
            newErrors.phone = 'Valid phone number is required';
        }

        setErrors(newErrors);
        return valid;
    };

    const handleNext = () => {
        if (validate()) {
            navigation.navigate('Form2');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                value={userDetails.name}
                onChangeText={(text) => setUserDetails({ ...userDetails, name: text })}
                style={styles.input}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}
            
            <Text style={styles.label}>Email:</Text>
            <TextInput
                value={userDetails.email}
                onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
                style={styles.input}
                keyboardType="email-address"
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            
            <Text style={styles.label}>Phone:</Text>
            <TextInput
                value={userDetails.phone}
                onChangeText={(text) => setUserDetails({ ...userDetails, phone: text })}
                style={styles.input}
                keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
            
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

export default Form1Screen;
