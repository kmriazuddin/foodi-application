import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckOutForm = ({ price, cart }) => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        if(typeof price !== "number" || price < 1){
            return;
        }
        axiosSecure.post('/create-payment-intent', {price})
        .then(res => {
            setClientSecret(res.data.clientSecret);
        })
    },[price, axiosSecure])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            setCardError("success!")
        }

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret,
        {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email,
                }
            }
        });

        if(confirmError){
            console.log(confirmError);
        }
        if(paymentIntent.status === 'succeeded'){
            console.log(paymentIntent.id);
            setCardError(`Your Transaction Id ${paymentIntent.id}`);
            toast.success(`Your Transaction Id ${paymentIntent.id}`);
            // Payment Info Data
            const paymentInfo = {
                email: user?.email,
                transitionId: paymentIntent.id,
                price,
                quantity: cart.length,
                status: "Order Pending",
                itemName: cart.map(item => item.name),
                cartItem: cart.map(item => item._id),
                menuItems: cart.map(item => item.menuItemId)
            }
            // Send Info Backend
            axiosSecure.post('/payments', paymentInfo)
            .then(res => {
                toast.success("Payment SuccessFull!")
                navigate('/order');
            })
        }
    };
    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-20 px-4 py-20'>
            <div className='flex flex-col sm:flex-row justify-start items-start gap-8'>
                {/* Left Side */}
                <div className='md:w-1/2 w-full space-y-3'>
                    <h4 className='text-lg font-semibold'>Order Summery</h4>
                    <p>Customer Name: {user?.name ? `{user?.name}` : "Md. _____"}</p>
                    <p>Email: {user?.email}</p>
                    <p>Total Price: ${price}</p>
                    <p>Number Of Items: {cart.length}</p>
                </div>
                {/* Right Side */}
                <div className='md:w-1/3 w-full space-y-5 card shrink-0 max-w-sm shadow-2xl bg-base-100 p-6 px-8'>
                    <h4 className='text-lg font-semibold'>Process Your Payment!</h4>
                    <h5 className='font-medium'>Credit/Debit Card</h5>
                    {/* Stripe From */}
                    <form onSubmit={handleSubmit}>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                        <button type="submit" disabled={!stripe} className='w-full btn btn-sm mt-5 bg-greenLight text-rose-500 hover:bg-green-400'>Pay</button>
                    </form>
                    {/* Card Error */}
                    {
                        cardError ? <p className='text-rose-500'>{cardError}</p> : ""
                    }
                    {/* Paypal */}
                    <div className='mt-5 text-center'>
                        <hr />
                        <button type="submit" disabled={!stripe} className='btn btn-sm mt-5 bg-greenLight text-rose-500 hover:bg-green-400'>Pay With Paypal!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutForm;