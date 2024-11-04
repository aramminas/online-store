import { Outlet } from "react-router-dom";

import { Header } from "../header";
import { Main } from "../main";
import { Footer } from "../footer";

export const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};
