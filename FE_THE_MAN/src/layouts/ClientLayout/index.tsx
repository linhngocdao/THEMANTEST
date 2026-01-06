import React from "react";
import { Outlet } from "react-router-dom";
import ClientFooter from "./Footer";
import ClientHeader from "./Header";
interface TypeClick {
}
const ClientLayout = () => {
  return (
    <>
      <ClientHeader />
      <main>
        <Outlet />
      </main>
      <ClientFooter />
    </>
  );
};

export default ClientLayout;
