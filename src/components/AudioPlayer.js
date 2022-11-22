/* eslint-disable jsx-a11y/media-has-caption */

import React, { useState, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import soundfile from '../assets/theme-song.mp3';

const ThemeSong = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef();

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };

  return (
    <div className="audioPlayer">
      <audio ref={ audioPlayer } src={ soundfile } loop autoPlay />
      <button onClick={ togglePlayPause } className="playPause" type="button">
        {isPlaying ? <FaPause /> : <FaPlay className="play" />}
      </button>
    </div>
  );
};

export default ThemeSong;
