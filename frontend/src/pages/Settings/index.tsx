import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NavigationMenu from "../../components/NavigationMenu";
import { getUser } from "../../store/actions/userActions";
import { userSelector } from "../../store/selectors";

export default function Settings() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { user } = useSelector(userSelector);

  return (
    <section className="d-flex">
      {user && <NavigationMenu user={user} />}
      <p>Settings</p>
    </section>
  );
}
