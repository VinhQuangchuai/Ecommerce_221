import { HomePage } from "../pages/Homepage";
import { Defaultlayout } from "../components/DefaultLayout";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { PayPage } from "../pages/PayPage";


export const publishRoutes = [
    { path: '/', component: HomePage },
    { path: '/shop', component: Defaultlayout},
    { path: '/shop/:id', component: ProductPage },
    { path: '/cart', component: CartPage },
    { path: '/pay', component: PayPage },

];

export const privateRoutes = [];