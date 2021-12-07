import NavigationMenu from "../../../components/NavigationMenu";

export default function Settings({ userData }: any) {
  return (
    <section className='container'>
     {userData && <NavigationMenu userData={userData} />}
      <p>Settings</p>
    </section>
  );
}
