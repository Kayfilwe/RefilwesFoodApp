import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '' });
    const [addressDetails, setAddressDetails] = useState({ address: '', city: '', state: '', zip: '' });
    const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiryMonth: '', expiryYear: '', cvv: '' });

    return (
        <FormContext.Provider value={{ userDetails, setUserDetails, addressDetails, setAddressDetails, paymentDetails, setPaymentDetails }}>
            {children}
        </FormContext.Provider>
    );
};
