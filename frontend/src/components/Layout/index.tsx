import { ReactNode } from "react";
import NavigationMenu from "../NavigationMenu";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="d-flex">
      <NavigationMenu />
      <section>{children}</section>
    </main>
  );
}
