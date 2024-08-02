import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  FaUser,
  FaVolumeUp,
  FaStepBackward,
  FaPlay,
  FaPause,
  FaStepForward,
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const songAry = [
  {
    name: "I. Start to Feel Your Body",
    img: "/images/main_img1.jpg",
    path: "/audios/guide_part1.mp3",
  },
  {
    name: "II. Connect to Your Being",
    img: "/images/main_img2.jpg",
    path: "/audios/guide_part2.mp3",
  },
  {
    name: "III. Live in the now",
    img: "/images/main_img3.jpg",
    path: "/audios/guide_part3.mp3",
  },
];

const MeditationHelper = () => {
  const [trackCt, setTrackCt] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(90);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hr, setHr] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [guide, setGuide] = useState(false);
  const [track, setTrack] = useState(new Audio());
  const [intervalId, setIntervalId] = useState(null);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

  const trackRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    trackRef.current = track;
  }, [track]);

  useEffect(() => {
    document.body.style.backgroundSize = "100% 100%";
    loadData(trackCt);
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      document.body.style.backgroundImage = ""; // Clear background image on cleanup
    };
  }, [trackCt]);

  const loadData = (trackCt) => {
    const newTrack = new Audio(songAry[trackCt].path);
    setTrack(newTrack);
    newTrack.addEventListener("loadedmetadata", () => {
      setDuration(newTrack.duration);
    });
    
    // Stop and clear previous track
    if (trackRef.current && !trackRef.current.paused) {
      trackRef.current.pause();
      trackRef.current.currentTime = 0;
    }
    
    setCurrentTime(0);
    timeSetZero();
    newTrack.load();
    
    if (intervalId) {
      clearInterval(intervalId);
    }
    
    setIntervalId(setInterval(backgroundRun, 1000));
    document.body.style.backgroundImage = `url(${songAry[trackCt].img})`;
  };
  

  const playSong = () => {
    console.log("Play Song Triggered", { isPlaying, track });
    if (track.paused) {
      if (trackRef.current && !trackRef.current.paused) {
        trackRef.current.pause();
        trackRef.current.currentTime = 0;
      }
      
      track.play().catch((error) => console.error("Error playing audio:", error));
      
      if (intervalId) {
        clearInterval(intervalId);
      }
      
      const newIntervalId = setInterval(() => {
        backgroundRun();
        displayTimer();
      }, 1000);
      
      setIntervalId(newIntervalId);
      setIsPlaying(true);
    }
  };
  

  const stopSong = () => {
    if (trackRef.current && !trackRef.current.paused) {
      trackRef.current.pause();
      trackRef.current.currentTime = 0; // Reset track to start
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIsPlaying(false);
    }
  };

const startOrStop = () => {
  console.log("Start or Stop Triggered", { isPlaying });
  if (isPlaying) {
    stopSong();
  } else {
    playSong();
  }
};

  const volumeChange = (e) => {
    const vol = e.target.value;
    setVolume(vol);
    track.volume = vol / 100;
  };

  const muteToggle = () => {
    track.muted = !track.muted;
  };

  const previousSong = () => {
    if (trackCt > 0) {
      stopSong(); // Stop the current track
      setTrackCt(trackCt - 1);
      setCurrentTime(0); // Reset slider to start
      timeSetZero(); // Reset timer values
      setIsPlaying(false); // Set isPlaying to false
      loadData(trackCt - 1); // Load the previous track
    }
  };

  const nextSong = () => {
    if (trackCt < songAry.length - 1) {
      setTrackCt(trackCt + 1);
      stopSong(); // Stop the current track
      timeSetZero(); // Reset the timer
      setCurrentTime(0); // Reset the slider
      setIsPlaying(false); // Show play button
    }
  };

  const backgroundRun = () => {
    if (track.duration > 0) {
      const position = (track.currentTime / track.duration) * 10000; // Update slider value
      setCurrentTime(position);

      // Update the total time
      const newSec = Math.floor(track.currentTime % 60);
      const newMin = Math.floor((track.currentTime / 60) % 60);
      const newHr = Math.floor(track.currentTime / 3600);

      setSec(newSec);
      setMin(newMin);
      setHr(newHr);
    }
  };

  const displayTimer = () => {
    setSec((prevSec) => {
      let newSec = prevSec + 1;
      let newMin = min;
      let newHr = hr;

      if (newSec >= 60) {
        newSec = 0;
        newMin += 1;
      }
      if (newMin >= 60) {
        newMin = 0;
        newHr += 1;
      }

      // Ensure the timer does not exceed the duration of the track
      if (newHr * 3600 + newMin * 60 + newSec >= duration) {
        clearInterval(intervalId); // Stop the timer
        setIsPlaying(false); // Set isPlaying to false
        return prevSec; // Return the last valid second
      }

      setMin(newMin);
      setHr(newHr);
      return newSec;
    });
  };

  const updateTimer = (time) => {
    const totalSeconds = Math.floor(time);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    setHr(hrs);
    setMin(mins);
    setSec(secs);
  };

  const changeTime = (e) => {
    stopSong(); // Stop the song when slider is changed

    const sliderPosition = (e.target.value / 10000) * duration;
    track.currentTime = sliderPosition;

    // Calculate new seconds, minutes, and hours from the slider position
    const newSec = Math.floor(sliderPosition % 60);
    const newMin = Math.floor((sliderPosition / 60) % 60);
    const newHr = Math.floor(sliderPosition / 3600);

    // Update state with the new time values
    setSec(newSec);
    setMin(newMin);
    setHr(newHr);

    setCurrentTime(e.target.value); // Update slider position

    playSong(); // Resume playback from the new position
  };

  const showGuide = () => {
    setGuide(!guide);
  };

  const timeSetZero = () => {
    setHr(0);
    setMin(0);
    setSec(0);
  };

  const autoPlay = () => {
    setAutoPlayEnabled(true);
    setTrackCt(0); // Start from the first track
    loadData(0); // Load the first track
    stopSong(); // Ensure the track is stopped initially
    timeSetZero(); // Reset timer values
    playSong(); // Start playback
  };

  const goToMeditationTimer = () => {
    navigate("/meditation-timer");
  };

  
  

  return (
    <Container>
      <Link id="link_id" href="/meditation-timer">
  Meditation Timer
</Link>
      <BigSquare>
        <LeftPart>
          <TitleContainer>
            <UserIcon />
            <MeditationApp>Meditation Helper</MeditationApp>
          </TitleContainer>
          <TrackImg
            src={songAry[trackCt].img}
            onClick={showGuide}
            alt="Track"
          />
          <SubVol>
            <VolIcon onClick={() => (track.muted = !track.muted)}>
              <FaVolumeUp />
            </VolIcon>
            <VolValue>{volume}</VolValue>
            <VolumeSlider
              id="vol_btn"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={volumeChange}
            />
          </SubVol>
        </LeftPart>
        <RightPart>
          <LeftTitleClass>{songAry[trackCt].name}</LeftTitleClass>
          <Btns>
            <ControlButton id="previous_part" onClick={previousSong}>
              <FaStepBackward />
            </ControlButton>
            <ControlButton id="play_mp3" onClick={startOrStop}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </ControlButton>
            <ControlButton id="next_part" onClick={nextSong}>
              <FaStepForward />
            </ControlButton>
          </Btns>
          <DurationSlider
            id="duration_btn"
            type="range"
            min="0"
            max="10000"
            value={currentTime}
            onChange={changeTime}
          />

          <TimeClass>
            <p id="hr_id">Total {hr < 10 ? `0${hr}` : hr}:</p>
            <p id="min_id">{min < 10 ? `0${min}` : min}:</p>
            <p id="sec_id">{sec < 10 ? `0${sec}` : sec}</p>
          </TimeClass>
          <TextWrapper>
          <h2>Find Your Inner Calm</h2>
          <br/>
          <p>Start your journey of relaxation and tranquility from here.</p>
           
          </TextWrapper>
        </RightPart>
      </BigSquare>
    </Container>
  );
};

export default MeditationHelper;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  /* background-image: url("./images/main_img1.jpg"); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  width: 100vw;
  height: 100vh;
`;

const Link = styled.a`
  position: absolute;
  background-color: coral;
  text-align: center;
  color: rgb(255, 255, 255);
  font-size: 30px;
  font-weight: bolder;
  width: 180px;
  height: 70px;
  top: 30px;
  left: 10px;
  border-radius: 15px;
  border: solid white 2px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: darkorange;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: -10px; /* Add margin to push down the buttons */
`;

const BigSquare = styled.div`
  display: flex;
  width: 80%;
  height: 70vh;
  background-color: rgba(255, 127, 80, 0.65);
  margin: 100px;
  padding: 20px;
  border-radius: 20px;
`;

const LeftPart = styled.div`
  flex: 60; /* Allocate 65% of the space */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align items to the top */
  padding: 20px;
  gap: 20px; /* Adds space between elements */
`;

const RightPart = styled.div`
  flex: 40; /* Allocate 35% of the space */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align items to the top */
  padding: 20px;
  box-sizing: border-box;
  gap: 40px; /* Include padding in element's total width and height */
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const UserIcon = styled(FaUser)`
  font-size: 2rem;
  margin-right: 10px;
  color: white;
  margin-top: -10px;
`;

const MeditationApp = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin-top: -10px;
`;

const TrackImg = styled.img`
  width: 100%;
  height: auto;

  cursor: pointer;
`;

const SubVol = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const VolIcon = styled(FaVolumeUp)`
  font-size: 20px;
  height: fit-content;
  width: fit-content;
  padding: 3px;
  color: white; /* Change color to white */
  /* Uncomment the line below if you want a background color */
  /* background-color: #e14414; */
`;

const VolValue = styled.p`
  margin-right: 10px;
  color: white;
`;

const VolumeSlider = styled.input.attrs({ type: "range" })`
  width: 200px;
  height: 5px;
  background: transparent; /* Set background to transparent to see custom track styles */
  border-radius: 5px;
  cursor: pointer;

  /* WebKit styles for Chrome, Safari */
  ::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 5px;
    background: #fff; /* Set track color to white */
    border-radius: 5px;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    background: #e14414; /* Custom color for the thumb */
    cursor: pointer;
    border-radius: 50%;
    margin-top: -5px; /* Center thumb vertically */
  }

  /* Firefox styles */
  ::-moz-range-track {
    height: 5px;
    background: #fff; /* Set track color to white */
    border-radius: 5px;
  }

  ::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background: #e14414; /* Custom color for the thumb */
    cursor: pointer;
    border-radius: 50%;
  }

  /* IE and Edge styles */
  ::-ms-track {
    height: 5px;
    background: #fff; /* Set track color to white */
    border-radius: 5px;
    border: none;
  }

  ::-ms-thumb {
    width: 15px;
    height: 15px;
    background: #e14414; /* Custom color for the thumb */
    cursor: pointer;
    border-radius: 50%;
  }

  ::-ms-fill-lower {
    background: #fff; /* Set track color to white */
    border-radius: 5px;
  }

  ::-ms-fill-upper {
    background: #fff; /* Set track color to white */
    border-radius: 5px;
  }
`;

const LeftTitleClass = styled.div`
  font-size: 40px; /* Increase the font size */
  color: rgb(255, 255, 255);
  font-weight: bolder;

  margin-bottom: 20px; /* Add margin below */
  margin-top: 40px;
`;

const ControlButton = styled.button`
  height: 50px;
  width: 50px;
  margin: 5px;
  background-color: rgba(85, 85, 85, 0.9); /* Background color */
  border-radius: 50%; /* Rounded corners */
  border: 2px solid white; /* White border around the button */
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, border-color 0.3s; /* Smooth transition */
  font-size: 20px; /* Font size */
  font-weight: bold; /* Make the text bold */
  padding: 0;
  box-sizing: border-box;

  &:hover {
    background-color: rgba(100, 100, 100, 0.9); /* Darker background on hover */
    border-color: rgba(100, 100, 100, 0.9); /* Change border color on hover */
  }
`;

const Btns = styled.div`
  display: flex;
  margin-bottom: 10px; /* Reduce margin to move buttons closer */
  /* Optional: Adjust spacing between individual buttons if needed */
`;
const Button = styled.button`
  height: 50px;
  width: 150px; /* Adjust width if needed */
  margin: 10px;
  background-color: rgba(255, 127, 80, 0.9); /* Background color */
  border-radius: 10px; /* Rounded corners */
  border: 2px solid white; /* White border around the button */
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, border-color 0.3s; /* Smooth transition for background and border color */
  font-size: 18px; /* Font size */
  font-weight: bold; /* Make the text bold */
  padding: 0 10px; /* Padding for better spacing */

  &:hover {
    background-color: rgba(255, 127, 80, 1); /* Darker background on hover */
    border-color: rgba(
      255,
      127,
      80,
      1
    ); /* Change border color on hover to match background */
  }
`;

const DurationSlider = styled.input.attrs({ type: "range" })`
  width: 100%;
  height: 5px;
  background: #fff; /* Track color: white */
  border-radius: 5px;
  cursor: pointer;

  /* WebKit styles for Chrome, Safari */
  ::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 5px;
    background: #fff; /* Track color: white */
    border-radius: 5px;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    background: rgba(85, 85, 85, 0.9); /* Slider dot color: darker grey */
    cursor: pointer;
    border-radius: 50%;
    margin-top: -5px; /* Center thumb vertically */
  }

  /* Firefox styles */
  ::-moz-range-track {
    height: 5px;
    background: #fff; /* Track color: white */
    border-radius: 5px;
  }

  ::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background: rgba(85, 85, 85, 0.9); /* Slider dot color: darker grey */
    cursor: pointer;
    border-radius: 50%;
  }

  /* IE and Edge styles */
  ::-ms-track {
    height: 5px;
    background: #fff; /* Track color: white */
    border-radius: 5px;
    border: none;
  }

  ::-ms-thumb {
    width: 15px;
    height: 15px;
    background: rgba(85, 85, 85, 0.9); /* Slider dot color: darker grey */
    cursor: pointer;
    border-radius: 50%;
  }

  ::-ms-fill-lower {
    background: #fff; /* Track color: white */
    border-radius: 5px;
  }

  ::-ms-fill-upper {
    background: #fff; /* Track color: white */
    border-radius: 5px;
  }
`;

const TextWrapper = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
  color: #ffffff; /* White color for the text */
  text-align: center;
  font-weight: bold; /* Make the text bold */
`;


const TimeClass = styled.div`
  color: white;
  margin-bottom: 20px;
  font-size: 30px; /* Adjust this value to increase the font size */
  font-weight: bold; /* Makes the text bold */
  display: flex; /* Use flexbox for alignment */
  gap: 5px; /* Space between time units */
  align-items: center; /* Vertically center-align items */
`;

const BottomBtn = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px; /* Reduce margin to move buttons closer to previous elements */
  /* Optional: Adjust padding or margins if needed */
`;