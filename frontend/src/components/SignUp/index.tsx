import ButtonsSign from "../ButtonsSign";

export default function SignUp() {
  // const createUser = (event: any) => {
  //   event.preventDefault();

  //   PostDataService.createPost({ content: event.target[0].value })
  //     .then(({ data }: any) => {
  //       setPosts({ data: "[data.data, ...posts?.data]" });
  //       event.target[0].value = "";
  //     })
  //     .catch((err: Error) => {
  //       console.error(err);
  //     });
  // };

  const createUser = () => {};

  const changeInputRegister = () => {};

  return (
    <section>
      <h1>Sign Up</h1>
      <form onSubmit={createUser}>
        <label>
          First name
          <input type='text' name='name' onChange={changeInputRegister} />
        </label>
        <label>
          Last name
          <input type='text' name='name' onChange={changeInputRegister} />
        </label>
        <label>
          User name
          <input type='text' name='name' onChange={changeInputRegister} />
        </label>
        <label>
          Email
          <input type='email' name='name' onChange={changeInputRegister} />
        </label>
        <label>
          Password
          <input type='password' name='name' onChange={changeInputRegister} />
        </label>
        <label>
          Password confirmation
          <input type='password' name='name' onChange={changeInputRegister} />
        </label>
      </form>
      <ButtonsSign />
    </section>
  );
}
