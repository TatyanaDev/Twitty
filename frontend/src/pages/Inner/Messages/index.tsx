import NavigationMenu from "../../../components/NavigationMenu";

export default function Messages({ userData }: any) {
  return (
    <section className='container'>
      {userData && <NavigationMenu userData={userData} />}
      <p>Messages</p>
    </section>
  );
}
