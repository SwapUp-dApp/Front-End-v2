import { Route, Routes } from "react-router-dom";
import { clientSideRoutes } from "./routes";

function App() {

  return (
    <>
      <Routes>
        {clientSideRoutes.map((route) => {
          if (route.layout && route.child_routes?.length) {
            return (
              <Route key={route.id} path={route.path} element={route.layout}>
                {route.child_routes.map((childRoute) => (
                  <Route key={childRoute.id} path={childRoute.path} element={childRoute.element} />
                ))}
              </Route>
            );
          } else {
            return <Route key={route.id} path={route.path} element={route.element} />;
          }
        })}
      </Routes>
    </>
  );
}

export default App;
