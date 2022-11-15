import { HomePage } from "../pages/Homepage";
import { Defaultlayout } from "../components/DefaultLayout";
import { ProductPage } from "../pages/ProductPage";


export const publishRoutes = [
    { path: '/', component: HomePage },
    { path: '/shop', component: Defaultlayout},
    { path: '/shop/:id', component: ProductPage },
    

    
];

export const privateRoutes = [];