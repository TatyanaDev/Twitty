import { ReactNode } from "react";
import NavigationMenu from "../NavigationMenu";
import style from "./styles.module.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className={style.main}>
      <NavigationMenu />

      <section className={style.container}>{children}</section>
    </main>
  );
}
