import { HomePage } from "../pages/Homepage";
import { Defaultlayout } from "../components/DefaultLayout";
import { ProductPage } from "../pages/ProductPage";
import Checkout from "../pages/Checkout/Checkout";

export const publishRoutes = [
  { path: "/", component: HomePage },
  { path: "/shop", component: Defaultlayout },
  { path: "/shop/:id", component: ProductPage },
];

export const privateRoutes = [{ path: "/checkout", component: Checkout }];
