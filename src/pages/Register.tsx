import { useParams } from "react-router-dom";
const Register = () => {
  const pathParams = useParams();

  return (
    <div>
      <h1>Registration Page: {pathParams.uuid}</h1>
    </div>
  );
};

export default Register;
