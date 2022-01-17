import { getSession } from "next-auth/react";
import MainScreen from "../components/MainScreen";

export default function Home() {
  return (
    <div className="bg-black overflow-scroll w-full">
      <main>
        <MainScreen />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
