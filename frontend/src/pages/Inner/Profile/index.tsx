import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import NavigationMenu from "../../../components/NavigationMenu";
import { getUserDataSelector } from "../../../store/selectors";
import { get_user_data } from "../../../store/actions/user";
import ACTION_TYPES from "../../../store/types";

export default function Profile() {
  const userData = useSelector(getUserDataSelector).userData;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    try {
      dispatch(get_user_data());
    } catch (err) {
      dispatch({ type: ACTION_TYPES.GET_USER_DATA_ERROR });

      localStorage.removeItem("token");

      history.push("/");
    }
  };

  return (
    <section className='container'>
      {userData && <NavigationMenu />}
      <p>Profile</p>
    </section>
  );
}
