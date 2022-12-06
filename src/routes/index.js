import { HomePage } from "../pages/Homepage";
import { Defaultlayout } from "../components/DefaultLayout";
import { ProductPage } from "../pages/ProductPage";
import {Checkout} from "../pages/Checkout/index";
import {PaymentFail} from "../pages/PaymentFail";
import {PaymentSuccess} from "../pages/PaymentSuccess";

export const publishRoutes = [
  { path: "/", component: HomePage },
  { path: "/shop", component: Defaultlayout },
  { path: "/shop/:id", component: ProductPage },
  { path: "/payment-failed", component: PaymentFail },
  { path: "/payment-success", component: PaymentSuccess },

];

export const privateRoutes = [{ path: "/checkout", component: Checkout }];
