/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import Player from "./Player";
import RecentPlayed from "./RecentPlayed";

const MainScreen = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylist] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylist(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-white">
      <header className="mt-8 ml-3">
        <div className="flex items-center">
          <img
            className="rounded-full w-24 h-24 ml-3"
            src={session?.user.image}
            alt=""
          />
          <h2 className="text-xl pt-1 pl-2">{session?.user.name}</h2>
        </div>
        <button
          className="w-20 bg-green-600 p-2 mt-3 ml-5 rounded-lg"
          onClick={signOut}
        >
          Sign out
        </button>
      </header>

      <h2 className="pt-8 pl-5 text-4xl">Recently played tracks</h2>
      <div className=" pl-5">
        <RecentPlayed />
      </div>

      <h1 className="pt-8 pl-5 text-4xl">Playlists</h1>
      <Link href="/center">
        <a>
          <div className="flex overflow-x-scroll pt-7 pb-5">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                onClick={() => setPlaylistId(playlist.id)}
                className="cursor-pointer hover:text-white pl-5 pt-3"
              >
                <div className="w-36 md:w-48 lg:w-56">
                  <img
                    className="container rounded-xl"
                    src={playlist.images[0]?.url}
                    alt=""
                  />
                  <p className="pt-2 text-center">{playlist.name}</p>
                </div>
              </div>
            ))}
          </div>
        </a>
      </Link>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export default MainScreen;
