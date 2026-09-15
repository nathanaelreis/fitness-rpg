import { useEffect, useState } from "react";
import { Home } from "./pages/Home/Home";
import { Inventory } from "./pages/Inventory/Inventory";

export function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (hash === "#/inventory") {
    return <Inventory />;
  }

  return <Home />;
}
