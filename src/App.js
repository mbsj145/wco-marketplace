import React, { Component,lazy, Suspense } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import EventBus from 'eventing-bus';
import Loader from "./components/Loader";


// import ProtectedRoutes from './routes/ProtectedRoutes'; //Authenticated routes
// import PublicRoute from './routes/PublicRoute'; 
import PrivateRoute from './routes/PrivateRoute'; 

import { logout, setAddress } from './store/actions/Auth';
import { connect } from "react-redux";

import { web3 } from "./store/web3";
import { networkId, message } from "./store/config";
import { tokenVerify } from "./store/jwtVerify";

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from "./pages/Home";
import Sell from "./pages/Sell";
import ItemDetail from './pages/ItemDetail';
import Activity from './pages/Activity';
import Author from './pages/Author';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import HelpCenter from './pages/HelpCenter';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Contact from './pages/Contact';
import ConnectWallet from './pages/ConnectWallet';
import CreateItem from './pages/CreateItem';
import Explore from './pages/Explore';
import Auctions from './pages/Auctions';
import UserProfile from './pages/UserProfile';
import Drops from './pages/Drops';
import Collection from './pages/Collection';
import EditProfile from './pages/EditProfile';
import EditCollection from './pages/EditCollection';
import MintingCollection from './pages/MintingCollection';
import PublicCollection from './pages/PublicCollection';



// import CreateCollection from "./pages/create-collection";
// import SignIn from "./pages/signin";
// import SignUp from "./pages/signup";
// import BuyerSettings from "./pages/buyer-settings";
// import CompleteProfile from "./pages/complete-profile";
// import FarmerSignup from "./pages/farmer-signup";
// import MyCollection from "./pages/my-collection";
// import AdminPanel from "./pages/admin-panel";
// import Deliveries from "./pages/deliveries";

//const Home = lazy(() => import('./pages/Home'));


const hist = createBrowserHistory();



export class App extends Component {

  async componentDidMount() {
    EventBus.on('info', (e) => toast.info(e));
    EventBus.on('error', (e) => toast.error(e));
    EventBus.on('success', (e) => toast.success(e));
    EventBus.on("tokenExpired", () => this.props.logout());
    if(!tokenVerify()) EventBus.on("tokenExpired", () => this.props.logout());
  };
  
  render() {
    const isAuthenticated = localStorage.getItem("token");
    return (
      <div>
        <Loader />
        <ToastContainer   closeOnClick position="bottom-left" theme="colored"/>
        {/* <Suspense fallback={<Loader />}></Suspense> */}

        {/* <BrowserRouter history={hist}>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="admin-panel" element={<AdminPanel />} />
              <Route path="deliveries" element={<Deliveries />} />
              <Route path="create-collection" element={<CreateCollection />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="buyer-settings" element={<BuyerSettings />} />
              <Route path="complete-profile" element={<CompleteProfile />} />
              <Route path="farmer-signup" element={<FarmerSignup />} />
              <Route path="collection" element={<MyCollection />} />
          </Routes>
        </BrowserRouter> */}

          {/* <Suspense fallback={<Loader />}> */}
        <BrowserRouter history={hist}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="itemdetail/:id" element={<ItemDetail />} />
              <Route path="activity" element={<Activity />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blogdetail" element={<BlogDetail />} />
              <Route path="author" element={<Author />} />
              {/* <Route path="helpcenter" element={<HelpCenter />} /> */}
              {/* <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} /> */}
              {/* <Route path="contact" element={<Contact />} /> */}
              <Route path="connectwallet" element={<ConnectWallet />} />
              {/* <Route path="createitem" element={<CreateItem />} /> */}
              <Route path="explore" element={<Explore />} />
              <Route path="auctions" element={<Auctions />} />
              <Route path="userprofile" element={<UserProfile />} />
              <Route path="drops" element={<Drops />} />
              <Route path="publiccollection" element={<PublicCollection />} />
              <Route path="collection/:chain/:tokenAddress" element={<Collection />} />
              <Route path="editprofile" element={<EditProfile />} />
              {/* <Route path="editcollection/:chain/:tokenAddress" element={<EditCollection />} />
              <Route path="mintingcollection/:chain/:tokenAddress" element={<MintingCollection />} /> */}
            </Routes>
        </BrowserRouter>
          {/* </Suspense> */}

      </div>
      )
  }

}

const mapDispatchToProps = { logout, setAddress };

const mapStateToProps = ({ Auth }) => {
  let { auth } = Auth
  return { auth }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

