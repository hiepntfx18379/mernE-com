import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/user/Signup";
import "react-toastify/dist/ReactToastify.css";
import Activation from "./components/user/Activation";
import Login from "./components/user/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailIsPage from "./pages/ProductDetailIsPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectPage from "./components/user/ProtectPage";
import { useSelector } from "react-redux";
import { userSelector } from "./tookit/selector";
import InBox from "./components/chat/InBox";
import CheckoutPage from "./pages/CheckoutPage";
import ForgotPassword from "./components/user/ForgotPassword";
import Verify from "./components/user/Verify";
import ResetPassword from "./components/user/ResetPassword";
import ParentsPage from "./pages/ParentsPage";
import ProfileUser from "./components/layout/profile/ProfileUser";
import AllOrders from "./components/layout/profile/AllOrders";
import ChangePassword from "./components/layout/profile/ChangePassword";
import AllProduct from "./components/layout/body/product/AllProduct";
import CartDetail from "./components/cartDetail/CartDetail";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-BB0p5FEwSer0F7I54lBKpz7E1N_bTeQ",
  authDomain: "e-com-f8e2e.firebaseapp.com",
  projectId: "e-com-f8e2e",
  storageBucket: "e-com-f8e2e.appspot.com",
  messagingSenderId: "1025008320721",
  appId: "1:1025008320721:web:818ed4007df9735d7705f0",
  measurementId: "G-SDSKPQRB8B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const user = useSelector(userSelector);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ParentsPage />}>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route
            path="/user/activation/:active_token"
            element={<Activation />}
          />
          <Route
            path="/user/resetPassword/:active_token"
            element={<ResetPassword />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/products" element={<ProductsPage />}>
            <Route path=":category" element={<AllProduct />} />
          </Route>
          <Route path="/product/:name" element={<ProductDetailIsPage />} />
          <Route path="/cart" element={<CartDetail />} />
          <Route path="/user/forgot" element={<ForgotPassword />} />
          <Route path="/profile" element={<ProfilePage />}>
            <Route
              index
              element={
                <ProtectPage>
                  <ProfileUser user={user} />
                </ProtectPage>
              }
            />
            <Route
              path="order"
              element={
                <ProtectPage>
                  <AllOrders />
                </ProtectPage>
              }
            />
            <Route
              path="change-password"
              element={
                <ProtectPage>
                  <ChangePassword />
                </ProtectPage>
              }
            />
            +
            <Route
              path="inbox"
              element={
                <ProtectPage>
                  <InBox />
                </ProtectPage>
              }
            />
          </Route>
          <Route
            path="/checkout"
            element={
              <ProtectPage>
                <CheckoutPage />
              </ProtectPage>
            }
          />
        </Route>
        <Route path="/cart" element={<CheckoutPage />} />
      </Routes>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
