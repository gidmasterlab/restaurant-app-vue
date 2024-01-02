export interface ProductReviewType {
	totalRating: number;
	totalReviews: number;
	rating1: number;
	rating2: number;
	rating3: number;
	rating4: number;
	rating5: number;
}

export interface ProductAdditionalType {
	id: string;
	name: string;
	description: string;
	price: number;
	quantity: number;
	limit: number;
}

export interface ProductType {
	id: string;
	slug: string;
	quantity: number;
	order: number;

	category: string;

	name: string;
	description: string;
	image: string;

	price: number;
	previousPrice: number;

	suggested: boolean;
	special: boolean;

	calories: number;
	servingPeople: number;
	portionSize: number;
	unitType: string;

	ingredients: string[];

	maxAdditionals: number;
	additionals: ProductAdditionalType[];

	reviews: ProductReviewType;

	// EXTRA
	comments?: string;
}
