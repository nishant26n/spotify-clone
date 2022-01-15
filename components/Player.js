/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { isPlayingState } from "../atoms/songAtom";

const Player = () => {
  const SpotifyWebApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  return (
    <div>
      <div>
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default Player;
