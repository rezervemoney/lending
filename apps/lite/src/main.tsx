import { getChainSlug } from "@morpho-org/uikit/lib/utils";
import "core-js/stable/array/iterator";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Navigate, Outlet, Route, Routes } from "react-router";

import "@/index.css";
import { BorrowSubPage } from "@/app/dashboard/borrow-subpage.tsx";
import { EarnSubPage } from "@/app/dashboard/earn-subpage.tsx";
import Page from "@/app/dashboard/page.tsx";
import App from "@/App.tsx";
import { DEFAULT_CHAIN } from "@/lib/constants";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <App>
              <Outlet />
            </App>
          }
        >
          <Route index element={<Navigate replace to={getChainSlug(DEFAULT_CHAIN)} />} />
          <Route path=":chain/">
            <Route index element={<Navigate replace to="earn" />} />
            <Route element={<Page />}>
              <Route path="earn" element={<EarnSubPage />} />
              <Route path="borrow" element={<BorrowSubPage />} />
            </Route>
            {/* <Route path="market/:id" element={<EarnSubPage />} />
              <Route path="vault/:address" element={<EarnSubPage />} /> */}
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
);
