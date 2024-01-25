// import { useNavigate } from "react-router-dom";

const Logout = () => {
  localStorage.removeItem("TOKEN");
}

export default Logout;