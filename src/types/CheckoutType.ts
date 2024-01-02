export type CheckoutStateType = "delivery" | "payment";

export interface CheckoutDeliveryType {
	address: string;
	city: string;
	state: string;
	zipcode: string;
}

export interface CheckoutPaymentType {
	holderName: string;
	cardNumber: number;
	expiryDate: string;
	cvv: number;
}
