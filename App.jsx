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
import Products from "./pages/Products";
import ProductExperience from "./pages/ProductExperience";
import QuoteBuilder from "./pages/QuoteBuilder";
import Compare from "./pages/Compare";
import Projects from "./pages/Projects";
import Industries from "./pages/Industries";
import Service from "./pages/Service";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";

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

function withLayout(Page) {
  return (
    <Layout>
      <Page />
    </Layout>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={withLayout(Home)} />
      <Route path="/home" element={withLayout(Home)} />
      <Route path="/Home" element={withLayout(Home)} />
      <Route path="/products" element={withLayout(Products)} />
      <Route path="/product-experience" element={withLayout(ProductExperience)} />
      <Route path="/quote-builder" element={withLayout(QuoteBuilder)} />
      <Route path="/compare" element={withLayout(Compare)} />
      <Route path="/projects" element={withLayout(Projects)} />
      <Route path="/industries" element={withLayout(Industries)} />
      <Route path="/service" element={withLayout(Service)} />
      <Route path="/resources" element={withLayout(Resources)} />
      <Route path="/about" element={withLayout(About)} />
      <Route path="/contact" element={withLayout(Contact)} />

      {/* Legacy strip / roller commerce routes */}
      <Route path="/custom-curtain-builder" element={withLayout(CustomCurtainBuilder)} />
      <Route path="/strip-rolls" element={withLayout(StripRolls)} />
      <Route path="/made-to-size-kits" element={withLayout(MadeToSizeKits)} />
      <Route path="/strip-hardware" element={withLayout(StripHardware)} />
      <Route path="/replacement-strips" element={withLayout(ReplacementStrips)} />
      <Route path="/rapid-roller-doors" element={withLayout(RapidRollerDoors)} />
      <Route path="/rapid-roller-doors/configure" element={withLayout(DoorConfigurator)} />
      <Route path="/rapid-roller-doors/:id" element={withLayout(ProductDetailContainer)} />
      <Route path="/request-a-quote" element={withLayout(RequestQuote)} />
      <Route path="/checkout" element={withLayout(Checkout)} />
      <Route path="/order-confirmation" element={withLayout(OrderConfirmation)} />

      <Route path="*" element={withLayout(PageNotFound)} />
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
