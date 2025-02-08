import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Pattern } from "../components/pattern";

export function Layout() {
  return (
    <main>
      <Pattern />
      <Header />
      <Outlet />
    </main>
  );
}
