import Home from "./pages/home/Home";
import  UsersList from "./pages/users/UsersList";
import NewUsers from "./pages/newUsers/NewUsers"
import Products from "./pages/products/Products";


const routs = [
  {path: "/", element: <Home />},
  {path: "/Users", element: <UsersList />},
    {path: "/NewUsers", element: <NewUsers />},
        {path: "/Products", element: <Products />},




];

export default routs;
