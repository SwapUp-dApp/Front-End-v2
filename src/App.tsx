import { Route, Routes } from "react-router-dom";
import { clientSideRoutes } from "./routes";
import { useEffect } from "react";
import axios from "axios";


function App() {

  // const getAllNfts = async () => {
  //   const walletId = "0xe6a28D675f38856ad383557C76dfdA2238961A49";
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8800/api/nfts/${walletId}`
  //     );
  //     console.log(`NFTs`, response.data);
  //     return response.data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   getAllNfts();
  // }, []);

  return (

    <Routes>
      {
        clientSideRoutes.map((route) => {
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
        })
      }
    </Routes>

  );
}

export default App;
