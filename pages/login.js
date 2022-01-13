import React from "react";
import { getProviders, signIn } from "next-auth/react";

const Login = (providers) => {
  return <div>Login Page</div>;
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
