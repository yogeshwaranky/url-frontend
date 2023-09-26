import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import BackgroundAnimate from './BackgroundAnimate.js';
import LinkResult from "./LinkResult.js";

export default function HomePage() {

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
  }
  const x = localStorage.getItem("x-Auth-token")
  if (x) {
    return (
      <div >
        <BackgroundAnimate />

        <div>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, ml: 140, mb: 2 }}
            onClick={() => handleLogOut()}
          >
            Log out
          </Button>
        </div>
        <div className="inputContainer">
          <h1 style={{ fontSize: '80px' }}>URL Shortner</h1>&nbsp;
        </div>
        <LinkResult />
      </div>
    )
  }
  else {
    <Navigate replace to='/' />
  }
}
