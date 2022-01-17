import { PlayIcon } from "@heroicons/react/outline";
import React from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import SpotifyAPI from "../lib/spotify";

const RecentTrack = ({ track }) => {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    SpotifyAPI.play({
      uris: [track.track.uri],
    });
  };

  return (
    <div className="w-full" onClick={playSong}>
      <div className="flex justify-center pt-2">
        <PlayIcon className="h-10 w-10 text-green-500" />
      </div>
    </div>
  );
};

export default RecentTrack;
