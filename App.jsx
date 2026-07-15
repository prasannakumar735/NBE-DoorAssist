import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/lib/CartContext";
import { QuoteModalProvider } from "@/lib/QuoteModalContext";
import QuoteModal from "@/components/quote/QuoteModal";
import Layout from "./Layout.jsx";
import PageNotFound from "./lib/PageNotFound";

import Home from "./pages/Home";
import CustomCurtainBuilder from "./pages/CustomCurtainBuilder";
import StripRolls from "./pages/StripRolls";
import MadeToSizeKits from "./pages/MadeToSizeKits";
import StripHardware from "./pages/StripHardware";
import ReplacementStrips from "./pages/ReplacementStrips";
import RapidRollerDoors from "./containers/RapidRollerDoorsContainer";
import DoorConfigurator from "./pages/DoorConfigurator";
import ProductDetailContainer from "./containers/ProductDetailContainer";
import RequestQuote from "./containers/QuoteContainer";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/custom-curtain-builder"
        element={
          <Layout>
            <CustomCurtainBuilder />
          </Layout>
        }
      />
      <Route
        path="/strip-rolls"
        element={
          <Layout>
            <StripRolls />
          </Layout>
        }
      />
      <Route
        path="/made-to-size-kits"
        element={
          <Layout>
            <MadeToSizeKits />
          </Layout>
        }
      />
      <Route
        path="/strip-hardware"
        element={
          <Layout>
            <StripHardware />
          </Layout>
        }
      />
      <Route
        path="/replacement-strips"
        element={
          <Layout>
            <ReplacementStrips />
          </Layout>
        }
      />
      <Route
        path="/rapid-roller-doors"
        element={
          <Layout>
            <RapidRollerDoors />
          </Layout>
        }
      />
      <Route
        path="/rapid-roller-doors/configure"
        element={
          <Layout>
            <DoorConfigurator />
          </Layout>
        }
      />
      <Route
        path="/rapid-roller-doors/:id"
        element={
          <Layout>
            <ProductDetailContainer />
          </Layout>
        }
      />
      <Route
        path="/request-a-quote"
        element={
          <Layout>
            <RequestQuote />
          </Layout>
        }
      />
      <Route
        path="/checkout"
        element={
          <Layout>
            <Checkout />
          </Layout>
        }
      />
      <Route
        path="/order-confirmation"
        element={
          <Layout>
            <OrderConfirmation />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <PageNotFound />
          </Layout>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <CartProvider>
        <QuoteModalProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <QuoteModal />
          <Toaster />
        </QuoteModalProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
