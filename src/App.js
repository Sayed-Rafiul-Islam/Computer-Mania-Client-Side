import { Route, Routes } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './Pages/RequireAuth/RequireAuth';
import Home from './Pages/Home/Home';
import './App.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import NotFound from './Pages/NotFound/NotFound';
import Header from './Pages/Header/Header';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyProfile from './Pages/Dashboard/MyProfile';
import MyOrders from './Pages/Dashboard/MyOrders';
import AddReview from './Pages/Dashboard/AddReview';
import MyPortfolio from './Pages/MyPortfolio/MyPortfolio';
import Blogs from './Pages/Blogs/Blogs';
import MakeAdmin from './Pages/Dashboard/MakeAdmin';
import AddPart from './Pages/Dashboard/AddPart';
import ManageParts from './Pages/Dashboard/ManageParts';
import AllOrders from './Pages/Dashboard/AllOrders';
import RequireAdmin from './Pages/RequireAdmin/RequireAdmin';
import Payment from './Pages/Dashboard/Payment';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='home' element={<Home></Home>}></Route>
        <Route path='placeOrder/:_id' element={
          <RequireAuth>
            <PlaceOrder></PlaceOrder>
          </RequireAuth>
        }></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="dashboard" element={
          <RequireAuth>
            <Dashboard></Dashboard>
          </RequireAuth>
        }>
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path='myOrders' element={<MyOrders></MyOrders>}></Route>
          <Route path='payment/:_id' element={<Payment></Payment>}></Route>
          <Route path='allOrders' element={<RequireAdmin><AllOrders></AllOrders></RequireAdmin>}></Route>
          <Route path='manageParts' element={<RequireAdmin><ManageParts></ManageParts></RequireAdmin>}></Route>
          <Route path='addPart' element={<RequireAdmin><AddPart></AddPart></RequireAdmin>}></Route>
          <Route path='makeAdmin' element={<RequireAdmin><MakeAdmin></MakeAdmin></RequireAdmin>}></Route>
          <Route path='addReview' element={<AddReview></AddReview>}></Route>
        </Route>
        <Route path="portfolio" element={<MyPortfolio></MyPortfolio>}></Route>
        <Route path="blogs" element={<Blogs></Blogs>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <ToastContainer theme="dark" />

    </div>
  );
}

export default App;
