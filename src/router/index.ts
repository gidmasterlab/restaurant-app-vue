import { createRouter, createWebHistory } from "vue-router";
import { storeToRefs } from "pinia";
import { useCheckoutStore } from "@/stores/checkout";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView
		},
		{
			path: "/menu",
			name: "menu",
			component: () => import("../views/MenuView.vue")
		},
		{
			path: "/checkout",
			name: "checkout",
			component: () => import("../views/CheckoutView.vue")
		},
		{
			path: "/product/:id",
			name: "product",
			component: () => import("../views/ProductView.vue")
		},
		{
			path: "/about",
			name: "about",
			component: () => import("../views/AboutView.vue")
		},
		{
			path: "/error/:id",
			name: "error",
			component: () => import("../views/ErrorView.vue")
		},
		{
			path: "/:catchAll(.*)",
			redirect: { name: "error", params: { id: "404" } }
		}
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0 };
		}
	}
});

router.beforeEach((to) => {
	const checkoutStore = useCheckoutStore();
	const { checkoutQuantity } = storeToRefs(checkoutStore);

	if (to.name === "checkout" && checkoutQuantity.value === 0) {
		return "/";
	} else {
		return true;
	}
});

export default router;
