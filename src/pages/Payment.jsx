import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../hooks/CheckoutForm";

const Payment = () => {
	const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
	
	return (
		<div className="max-w-xl mt-10 mx-auto">
			<h1 className="uppercase text-4xl text-center mb-10">payment</h1>
			<Elements stripe={stripePromise}>
				<CheckoutForm />
			</Elements>
		</div>
	);
};

export default Payment;
