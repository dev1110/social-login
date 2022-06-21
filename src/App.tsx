import logo from "./logo.svg";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from 'react-google-login';
import FacebookLogin from "react-facebook-login";
import { useSelector, useDispatch } from "react-redux";
import {
  userGoogleSigninAction,
  userFacebookSigninAction,
  userSignOutAction,
} from "./redux/actions/userActions";
import "./App.css";

function App() {
  const state = useSelector((state: any) => state);
  const dispatch: any = useDispatch();
  console.log("state", state);
  const { userReducer } = state;

  const googleOnSuccess = (response: any) => {
    console.log(response);
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    dispatch(userGoogleSigninAction(tokenBlob));
  };

  const googleLogout = () => {
    dispatch(userSignOutAction());
  };

  const facebookSuccessResponse = (response: any) => {
    console.log(response);
  //   (window:any).FB.getLoginStatus((response)=> {
  //     statusChangeCallback(response);
  // });
    // const tokenBlob = new Blob(
    //   [JSON.stringify({ access_token: response.accessToken }, null, 2)],
    //   { type: "application/json" }
    // );
    // dispatch(userFacebookSigninAction(tokenBlob));
  };
  
  const facebookLogout = () => {
    // Window.FB.logput()
   (window as any).FB.logout();
   dispatch(userSignOutAction());
  };

  let content = 
    userReducer.data?.token ? (
      <div>
        <p>Authenticated</p>
        <div><h3>{userReducer.data?.user.name}</h3></div>
        <div>{userReducer.data?.user.email}</div>
        <div style={{fontSize:'small'}}>{userReducer.data?.token}</div>
        <div>
        {userReducer.data?.user.provider==='google'?
          <GoogleLogout
            clientId="355245734783-6d39o4gv1g3c0jaqova7hbfuplis3n68.apps.googleusercontent.com"
            buttonText="Google Logout"
            onLogoutSuccess={googleLogout}
          >
          </GoogleLogout>
        :userReducer.data?.user.provider==='facebook'? 
        
          <button onClick={()=>facebookLogout()}>Logout from FB</button>
        :<button>Logout</button>
        }
        </div>
      </div>
    ) : (
      <div>
        <GoogleLogin
          clientId="355245734783-6d39o4gv1g3c0jaqova7hbfuplis3n68.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={googleOnSuccess}
        />
        <FacebookLogin
          appId='547174393484762'
          scope="public_profile,email"
          autoLoad={false}
          fields="name,email,picture"
          callback={facebookSuccessResponse} />
      </div>
    );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {content}
      </header>
    </div>
  );
}

export default App;
