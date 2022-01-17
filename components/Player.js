/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import { SwitchHorizontalIcon, VolumeUpIcon } from "@heroicons/react/outline";
import {
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  FastForwardIcon,
} from "@heroicons/react/solid";
import { debounce } from "loadsh";

const Player = () => {
  const spotifyAPI = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(isPlayingState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyAPI.getMyCurrentPlaybackState().then((data) => {
        console.log("Now playing: ", data.body?.item);
        setCurrentTrackId(data.body?.item?.id);

        spotifyAPI.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  const handlePlayPause = () => {
    spotifyAPI.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyAPI.pause();
        setIsPlaying(false);
      } else {
        spotifyAPI.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyAPI.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyAPI, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVloume(volume);
    }
  }, [volume]);

  const debounceAdjustVloume = useCallback(
    debounce(
      (volume) => {
        spotifyAPI.setVolume(volume).catch((err) => {});
      },
      [500]
    ),
    []
  );

  return (
    <div className="h-24 bg-gradient-to-b from-gray-900 to-black text-white grid grid-cols-3 text-sm md:text-base px-2 md:px-8 ">
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-12 w-12"
          src={songInfo?.album?.images[0]?.url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p className="text-sm text-gray-500">
            {songInfo?.artists?.[0]?.name}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />

        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
        )}

        <FastForwardIcon className="button" />

        <ReplyIcon className="button" />
      </div>

      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5 ">
        <VolumeUpIcon className="button" />
        <input
          className="w-14 md:w-20"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
};

export default Player;
