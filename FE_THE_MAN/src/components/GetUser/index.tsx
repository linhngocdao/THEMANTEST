import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../../redux/slices/authSlice";

function GetUser() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") as string);
  useEffect(() => {
    if (user) {
      dispatch(
        signin({
          data: user,
        })
      );
    }
  }, [dispatch]);

  return null;
}

export default GetUser;
