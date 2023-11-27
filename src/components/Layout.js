import Header from "./Header";

function Layout({ children }) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}

export default Layout;
