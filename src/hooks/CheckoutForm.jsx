import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const axiosSecure = useAxiosSecure();
	const [clientSecret, SeTClientSecret] = useState();
	const [amount, setAmount] = useState(100);
	const [date, setDate] = useState(""); 
	const { user } = useAuth();
	const navigate = useNavigate();
    

	const handleAmountChange = (e) => {
		const value = e.target.value;
		if (value < 0) {
			Swal.fire("Not allowed to use negative values");
			setAmount(0);
		} else {
			setAmount(value);
		}
	};

	const handleDateChange = (e) => {
		setDate(e.target.value);
	};
   

	useEffect(() => {
		if (amount > 0) {
			axiosSecure
				.post("/create-payment-intent", {
					price: amount,
				})
				.then((res) => {
					
					SeTClientSecret(res.data.clientSecret);
				});
		}
	}, [amount, axiosSecure]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		const card = elements.getElement(CardElement);
		if (card == null) {
			return;
		}

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (error) {
			console.log("error ", error);
		} else {
			console.log("paymentMethod", paymentMethod);
		}

		const { paymentIntent, err } = await stripe.confirmCardPayment(
			clientSecret,
			{
				payment_method: {
					card: card,
					billing_details: {
						name: user?.displayName || "unknown",
						email: user?.email || "unknown",
					},
				},
			}
		);

		if (err) {
			console.log("error", err);
		} else {
			console.log("paymentIntent", paymentIntent);
		}

		if (paymentIntent.status === "succeeded") {
			const paymentInfo = {
				name: user.displayName || "unknown",
				email: user.email,
				price: amount,
				date: date, 
			};

			const res = await axiosSecure.post("/payments", paymentInfo);
			console.log("payment post", res.data);

			if (res.data.result.insertedId) {
				Swal.fire({
					position: "top-center",
					icon: "success",
					title: "Donate Successful",
					showConfirmButton: false,
					timer: 1500,
				});
				navigate("/funding");
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className="m-20">
			<div className="mb-4">
				<label htmlFor="amount" className="block text-xl font-bold">
					Donation Amount:
				</label>
				<input
					id="amount"
					type="number"
					value={amount}
					onChange={handleAmountChange}
					className="w-full py-2 px-4 border rounded"
					placeholder="Enter amount to donate"
				/>
			</div>

			
			<div className="mb-4">
				<label htmlFor="date" className="block text-xl font-bold">
					Donation Date:
				</label>
				<input
					id="date"
					type="date"
					value={date}
					onChange={handleDateChange}
					className="w-full py-2 px-4 border rounded"
				/>
			</div>

			<CardElement
				className="border p-3"
				options={{
					style: {
						base: {
							fontSize: "16px",
							color: "#424770",
							"::placeholder": {
								color: "#aab7c4",
							},
						},
						invalid: {
							color: "#9e2146",
						},
					},
				}}
			/>

			<button
				className="btn btn-primary p-2 rounded-md mt-5 text-white bg-red-600 px-10"
				type="submit"
				disabled={!stripe || !clientSecret || amount <= 0}
			>
				Pay ${amount}
			</button>
		</form>
	);
};

export default CheckoutForm;
