import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import NavigationMenu from "../../../components/NavigationMenu";
import UserService from "../../../services/user.service";

export default function Messages({ userData, setUserData }: any) {
  const history = useHistory();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const { data } = await UserService.getUserData();

      setUserData(data.data);
    } catch (err) {
      localStorage.removeItem("token");

      history.push("/");
    }
  };

  return (
    <section className='container'>
      {userData && <NavigationMenu userData={userData} />}
      <p>Messages</p>
    </section>
  );
}
