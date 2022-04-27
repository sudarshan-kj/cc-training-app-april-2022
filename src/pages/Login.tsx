import { useLocation } from "react-router-dom";

const Login = () => {
  const location: any = useLocation();
  console.log("Location is", location);

  return (
    <div>
      <h1>Login Page: {location.state.id}</h1>
    </div>
  );
};

export default Login;
