import Board from "./pages/home/components/board/board";
import Header from "./pages/home/components/header";
import Footer from "./pages/home/components/footer/footer";
import Menu from "./pages/home/components/header/menu/menu";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import TaskDetails from "./pages/details/details";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Board />,
    },
    {
        path: "/tasks/:id",
        element: <TaskDetails />
    }
]);

function App() {
  return (
      <div className='wrapper'>
          <div className='header_container'>
              <Header />
              <Menu />
          </div>
          <div className='main_container'>
              <RouterProvider router={router}/>
          </div>
          <div className='footer_container'>
              <Footer />
          </div>
      </div>
  )
}

export default App;
