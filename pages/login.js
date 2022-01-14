import React from "react";
import { getProviders, signIn } from "next-auth/react";

const Login = ({ providers }) => {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center ">
      <img className="w-52 mb-5" src="/spotify-icon.png" alt="icon" />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#0FBC4B] text-black p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
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
