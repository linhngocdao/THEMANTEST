import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AdminLayout, ClientLayout } from "./layouts";
import CartPage from "./pages/Carts";
import Signup from "./pages/Signup";
import CheckoutPage from "./pages/Checkout";
import DetailProduct from "./pages/Detail";
import ContactPage from "./pages/Contact";
import HomePage from "./pages/Home";
import Signin from "./pages/Signin";
import ForgetPassword from "./pages/ForgetPassword";
import ProductManager from "./pages/Admin/Products/ProductManager";
import ProductAdd from "./pages/Admin/Products/ProductAdd";
import PostManager from "./pages/Admin/Posts/PostManager";
import PostAdd from "./pages/Admin/Posts/PostAdd";
import CategoryPostManager from "./pages/Admin/CategoryPost/CatePostManager";
import CatePostAdd from "./pages/Admin/CategoryPost/CatePostAdd";
import CatePostEdit from "./pages/Admin/CategoryPost/CatePostEdit";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import PostEdit from "./pages/Admin/Posts/PostEdit";
import CategoryProductManager from "./pages/Admin/CategoryProduct/CateProductManager";
import CateProductAdd from "./pages/Admin/CategoryProduct/CateProductAdd";
import CateProductEdit from "./pages/Admin/CategoryProduct/CateProductEdit";
import SliderManager from "./pages/Admin/Slider/SliderManager";
import SliderAdd from "./pages/Admin/Slider/SliderAdd";
import SliderEdit from "./pages/Admin/Slider/SliderEdit";
import ProductEdit from "./pages/Admin/Products/ProductEdit";
import CartPostManager from "./pages/Admin/Carts/CartManager";
import CartUpdate from "./pages/Admin/Carts/CartUpdate";
import UserManager from "./pages/Admin/User/UserManager";
import UserAdd from "./pages/Admin/User/UserAdd";
import UserEdit from "./pages/Admin/User/UserEdit";
import DetailPost from "./pages/DetailPost";
import EmailVerify from "./components/EmailVerify";
import NotFound from "./components/NotFound";
import PostPage from "./pages/Post";
import PrivateRouter from "./components/PrivatrRouter";
import DetailCateProduct from "./pages/DetailCateProduct";
import OrderStatus from "./pages/OrderStatus";
import Dashboard from "./pages/Admin/Dashboard";
import ConfirmPassword from "./pages/ConfirmPassword";
import AccountPage from "./pages/AccountPage";
import Editaccount from "./pages/AccountPage/Editaccount";
import ThankkiuPage from "./pages/Thankkiu_page";
import Scoll from "./components/ScrollButton";
import ContactManager from "./pages/Admin/Contact/ContactManager";
import Products from "./pages/Products";
import Mess from "./components/messenger";
import Profile from "./pages/Profile";
import Detail_Order from "./pages/OrderStatus/Detail_Order";
import ScrollIntoView from "./hooks/useScrollIntoView";
import Search from "./pages/Search";
import VoucherManager from "./pages/Admin/Voucher";
import VoucherAdd from "./pages/Admin/Voucher/Add";
import VoucherEdit from "./pages/Admin/Voucher/Edit";
import CommetManager from "./pages/Admin/Comment/ComentManager";
import { useState } from "react";
function App() { 
  return (
    <>
      <Routes>
        <Route path="/" element={<ClientLayout  />}>
          <Route index element={<HomePage />} />
          <Route
            path="/cart"
            element={
              <ScrollIntoView>
                <CartPage />
              </ScrollIntoView>
            }
          />
          <Route
            path="/order"
            element={
              <ScrollIntoView>
                <OrderStatus />
              </ScrollIntoView>
            }
          />
          <Route
            path="/profile"
            element={
              <ScrollIntoView>
                <Profile />
              </ScrollIntoView>
            }
          />
          <Route path="/thankkiu" element={<ThankkiuPage />} />
          <Route
            path="/signin"
            element={
              <ScrollIntoView>
                <Signin />
              </ScrollIntoView>
            }
          />
          <Route
            path="/signup"
            element={
              <ScrollIntoView>
                <Signup />
              </ScrollIntoView>
            }
          />
          <Route
            path="/users/verify/:id"
            element={
              <ScrollIntoView>
                <EmailVerify />
              </ScrollIntoView>
            }
          />
          <Route
            path="/users/forget-password"
            element={
              <ScrollIntoView>
                <ForgetPassword />
              </ScrollIntoView>
            }
          />
          <Route
            path="/user/reset-password"
            element={
              <ScrollIntoView>
                <ConfirmPassword />
              </ScrollIntoView>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <ScrollIntoView>
                <DetailProduct/>
              </ScrollIntoView>
            }
          />
          <Route
            path="/products"
            element={
              <ScrollIntoView>
                <Products />
              </ScrollIntoView>
            }
          />
          <Route
            path="/post"
            element={
              <ScrollIntoView>
                <PostPage />
              </ScrollIntoView>
            }
          />
          <Route
            path="/post/:id"
            element={
              <ScrollIntoView>
                <PostPage />
              </ScrollIntoView>
            }
          />
          <Route
            path="/detail/:id/post"
            element={
              <ScrollIntoView>
                <DetailPost />
              </ScrollIntoView>
            }
          />
          <Route
            path="/detail/cate/:id/product"
            element={
              <ScrollIntoView>
                <DetailCateProduct />
              </ScrollIntoView>
            }
          />
          <Route
            path="/contact"
            element={
              <ScrollIntoView>
                <ContactPage />
              </ScrollIntoView>
            }
          />
          <Route
            path="/checkout"
            element={
              <ScrollIntoView>
                <CheckoutPage />
              </ScrollIntoView>
            }
          />
          <Route
            path="/account"
            element={
              <ScrollIntoView>
                <AccountPage />
              </ScrollIntoView>
            }
          />
          <Route
            path="/editaccount/:id"
            element={
              <ScrollIntoView>
                <Editaccount />
              </ScrollIntoView>
            }
          />
          <Route
            path="/detailOrder/:id"
            element={
              <ScrollIntoView>
                <Detail_Order />
              </ScrollIntoView>
            }
          />
          <Route
            path="/search/:name"
            element={
              <ScrollIntoView>
                <Search />
              </ScrollIntoView>
            }
          />
        </Route>

        <Route path="/*" element={<NotFound />} />
        {/* Admin */}

        <Route
          path="/admin"
          element={
            <PrivateRouter>
              <AdminLayout />
            </PrivateRouter>
          }
        >
          {/* <Route index element={<AdminLayout><h1>Dashboard</h1></AdminLayout>} /> */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products">
            <Route index element={<ProductManager />} />
            <Route path="add" element={<ProductAdd />} />
            <Route path=":id/edit" element={<ProductEdit />} />
            {/* <Route path=':id' element={<AdminLayout><ProductEdit onUpdate={onHandleUpdate} /></AdminLayout>} /> */}
          </Route>
          <Route path="vouchers">
            <Route index element={<VoucherManager />} />
            <Route path="add" element={<VoucherAdd />} />
            <Route path=":id/edit" element={<VoucherEdit />} />
            {/* <Route path=':id' element={<AdminLayout><ProductEdit onUpdate={onHandleUpdate} /></AdminLayout>} /> */}
          </Route>
          <Route path="carts">
            <Route index element={<CartPostManager />} />
            <Route path="update/:id" element={<CartUpdate />} />
            {/* <Route path=':id' element={<AdminLayout><ProductEdit onUpdate={onHandleUpdate} /></AdminLayout>} /> */}
          </Route>

          <Route path="category_product">
            <Route index element={<CategoryProductManager />} />
            <Route path="add" element={<CateProductAdd />} />
            <Route path=":id/edit" element={<CateProductEdit />} />
          </Route>

          <Route path="post">
            <Route index element={<PostManager />} />
            <Route path="add" element={<PostAdd />} />
            <Route path=":id/edit" element={<PostEdit />} />
          </Route>

          <Route path="category_post">
            <Route index element={<CategoryPostManager />} />
            <Route path="add" element={<CatePostAdd />} />
            <Route path=":id/edit" element={<CatePostEdit />} />
          </Route>
          <Route path="comment">
            <Route index element={<CommetManager />} />
          </Route>

          <Route path="slider">
            <Route index element={<SliderManager />} />
            <Route path="add" element={<SliderAdd />} />
            <Route path=":id/edit" element={<SliderEdit />} />
          </Route>

          <Route path="users">
            <Route index element={<UserManager />} />
            <Route path="add" element={<UserAdd />} />
            <Route path=":id/edit" element={<UserEdit />} />
          </Route>

          <Route path="contact">
            <Route index element={<ContactManager />} />
            {/* <Route path="add" element={<UserAdd />} />
            <Route path=":id/edit" element={<UserEdit />} /> */}
          </Route>
        </Route>
      </Routes>
      <Scoll />
      <Mess />
    </>
  );
}

export default App;
