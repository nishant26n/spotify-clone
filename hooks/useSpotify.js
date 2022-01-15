import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import SpotifyAPI from "../lib/spotify";

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      //If refresh access token attempts fail, direct the user to login page..
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      SpotifyAPI.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return SpotifyAPI;
};

export default useSpotify;
