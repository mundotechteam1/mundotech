import { Outlet } from "react-router-dom"

export default function App() {
  return (
    <>
      {/* <Header /> + añadir import */}

      <main>
        <Outlet />
      </main>

      {/* <Footer /> + añadir import */}
    </>
  );
}
