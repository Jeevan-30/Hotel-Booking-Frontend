import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CARD_ELEMENT_OPTIONS = {
    hidePostalCode: true,
};

export default function PaymentForm({ formData, setFormData }) {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setErrorMessage("Stripe has not loaded yet.");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        try {
            const { clientSecret } = await axios.post('https://hotel-backend-3.onrender.com/create-payment-intent', {
                totalprice: formData.totalprice,
            }).then(res => res.data);

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: formData.customer,
                        phone: formData.custNo,
                    },
                },
            });

            if (error) {
                setErrorMessage(`Payment failed: ${error.message}`);
            } else if (paymentIntent.status === 'succeeded') {
                await axios.post('https://hotel-backend-3.onrender.com/putbooking', { formData });
                await axios.get(`https://hotel-backend-3.onrender.com/updateroom/${formData.room}`);
                alert('Booking and payment successful!');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="card-element">Credit or debit card:</label>
                <CardElement id="card-element" className="form-control" options={CARD_ELEMENT_OPTIONS} />
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <button type="submit" className="btn btn-primary" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
}
