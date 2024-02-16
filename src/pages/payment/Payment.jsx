import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckOutForm from './CheckOutForm';
import { loadStripe } from '@stripe/stripe-js';
import useCart from '../../hooks/useCart';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
    const [cart] = useCart();

    // Calculate The Price
    const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
    const totalPrice = parseFloat(cartTotal.toFixed(2));

    return (
        <div>
            <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-20'>
                <div className='flex justify-center items-center'>
                    <img className='flex justify-center items-center m-auto' src="https://i.ibb.co/GF7WCTD/Payment-Information.gif" alt="Payment" />
                    <div>
                        <h3 className='text-lg font-semibold'>Why should ecommerce businesses use online payment gateways?</h3>
                        <p> Online payment gateways offer two main benefits to eCommerce businesses When electronic payment processing is performed automatically, there is no room for human error. It saves a lot of time and effort for the business and allows one to organize recurring payments as subscription programs.</p>
                    </div>
                </div>
            </div>
            <Elements stripe={stripePromise}>
                <CheckOutForm cart={cart} price={totalPrice} />
            </Elements>
        </div>
    );
};

export default Payment;