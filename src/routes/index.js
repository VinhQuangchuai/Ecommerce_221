import { HomePage } from "../pages/Homepage";
import { Defaultlayout } from "../components/DefaultLayout";
import { ProductPage } from "../pages/ProductPage";
import { Checkout } from "../pages/Checkout";
import { PaymentSuccess } from "../pages/PaymentSuccess";
import { PaymentFail } from "../pages/PaymentFail";


export const publishRoutes = [
    { path: '/', component: HomePage },
    { path: '/shop', component: Defaultlayout},
    { path: '/shop/:id', component: ProductPage },
    { path: '/checkout', component: Checkout },
    { path: '/success', component: PaymentSuccess },
    { path: '/fail', component: PaymentFail }
    
];

export const privateRoutes = [];