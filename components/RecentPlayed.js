/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import RecentTrack from "./RecentTrack";

const RecentPlayed = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [tracks, setTracks] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyRecentlyPlayedTracks().then((data) => {
        setTracks(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  console.log(tracks);

  return (
    <div>
      <div className="flex overflow-x-scroll pt-7 pb-5">
        {tracks.map((track) => (
          <div
            key={track.id}
            onClick={() => setPlaylistId(track.id)}
            className="cursor-pointer hover:text-white pl-5 pt-3"
          >
            <div className="w-36 md:w-48 lg:w-56">
              <img
                className="container rounded-xl"
                src={track.track.album.images[0]?.url}
                alt=""
              />
              <RecentTrack key={track.id} track={track} />
              <p className="pt-2 text-center">{track.track.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPlayed;
