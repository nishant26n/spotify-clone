/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { shuffle } from "loadsh";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "../components/Songs";
import Player from "../components/Player";
import { ArrowLeftIcon } from "@heroicons/react/solid";

const Center = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
  ];

  const { data: session } = useSession();
  const SpotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    SpotifyApi.getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong!", err));
  }, [SpotifyApi, playlistId]);

  console.log(playlist);

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide ">
      <header className="absolute top-5 right-8 ">
        <div
          onClick={signOut}
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-0.5 pr-4"
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <div className="grid-flow-row ">
            <h2>{session?.user.name}</h2>
            <p className="text-gray-500">Sign out</p>
          </div>
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <Link href="/">
          <a>
            <button className="absolute top-7 text-white">
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
          </a>
        </Link>
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p> PLAYLIST </p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export default Center;
