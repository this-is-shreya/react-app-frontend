import { Outlet, Link } from "react-router-dom";

const Layout = (props) => {
  return (
    <>
      <nav>
        <ul>
          <li style={{float:"right"}}>
            <Link to="/signup" style={{display:props.isSignUp }}>Signup</Link>
          </li>
          <li style={{float:"right"}}>
            <Link to="/" style={{display:props.isSignIn}}>Login</Link>
          </li>
          <li style={{float:"right"}}>
            <Link to="/" style={{display:props.isSignOut}}>Sign out</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;