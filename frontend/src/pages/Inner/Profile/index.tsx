import NavigationMenu from "../../../components/NavigationMenu";

export default function Profile({ userData }: any) {
  return (
    <section className='container'>
     {userData && <NavigationMenu userData={userData} />}
      <p>Profile</p>
    </section>
  );
}
