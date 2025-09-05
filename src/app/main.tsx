import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router";

async function enableMocking() {
  if (import.meta.env.PROD) {
    return;
  }

  const { worker } = await import("@/shared/api/mocks/browser");
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
});
