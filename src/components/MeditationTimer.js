import React, { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";

const MeditationTimer = () => {
  const [hr, setHr] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHoursMenuOpen, setIsHoursMenuOpen] = useState(false);
  const [isMinutesMenuOpen, setIsMinutesMenuOpen] = useState(false);
  const [audioTime, setAudioTime] = useState(0);
  const buttonRef = useRef(null);

  const audioRef = useRef(new Audio("/audios/medimusic.mp3"));

  useEffect(() => {
    // const track = new Audio("/audios/medimusic.mp3");
    const track = audioRef.current;
    if (isPlaying) {
      track.play();
      track.currentTime = audioTime;
    } else {
      track.pause();
      setAudioTime(track.currentTime); 
    //   track.currentTime = 0;
    }
    return () => {
      track.pause();
    };
  }, [isPlaying]);

  useEffect(() => {
    let id;
    if (isPlaying && (hr > 0 || min > 0 || sec > 0)) {
      id = setInterval(() => {
        setSec((prevSec) => {
          if (prevSec > 0) {
            return prevSec - 1;
          } else if (min > 0) {
            setMin((prevMin) => prevMin - 1);
            return 59;
          } else if (hr > 0) {
            setHr((prevHr) => prevHr - 1);
            setMin(59);
            return 59;
          } else {
            return 0;
          }
        });
      }, 1000);
    } else if (!isPlaying) {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [isPlaying, hr, min, sec]);
  

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClick = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handleStart();
    }
  };

  const handleHoursClick = () => {
    setIsHoursMenuOpen(true);
    setIsMinutesMenuOpen(false);
  };

  const handleMinutesClick = () => {
    setIsMinutesMenuOpen(true);
    setIsHoursMenuOpen(false);
  };

  const getDropdownPosition = () => {
    if (buttonRef.current) {
      const { top, left, height } = buttonRef.current.getBoundingClientRect();
      return {
        top: top + window.scrollY + height - 80, // Shift up by reducing margin
        left: left + window.scrollX + 10, // Position slightly to the right of the button
      };
    }
    return { top: 0, left: 0 };
  };
  
  

  const handleHrSelect = (hour) => {
    setHr(hour);
    setIsHoursMenuOpen(false);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const handleMinSelect = (minute) => {
    setMin(minute);
    setIsMinutesMenuOpen(false);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const handlePause = () => {
    
    setIsPlaying(false);
  };

  const handleStart = () => {
    if (hr === 0 && min === 0 && sec === 0) {
      alert("Please set a timer duration.");
      return;
    }
    setIsPlaying(true);
  };

  const containerStyle = {
    backgroundImage: 'url("/images/page2_img.jpg")',
    fontFamily: "Arial, Helvetica, sans-serif",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "column",
    height: "100vh",
  };

  const timeClassStyle = {
    display: "flex",
    flexDirection: "column", // Stack time boxes and labels vertically
    alignItems: "center",
  };

  const timeBoxStyle = {
    height: "250px",
    width: "250px",
    fontSize: "120px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "0", // Remove margin to place boxes closer together
    color: "aliceblue",
    textShadow: "6px 6px 12px rgba(0, 0, 0, 0.6)", // Darker shadow with increased blur
  };

  const additionalBoxStyle = {
    height: "50px", // Height of the new box
    width: "250px", // Match the width of the time box
    backgroundColor: "#4CAF50", // Bright light green color
    textAlign: "center",
    lineHeight: "50px", // Center the text vertically
    color: "white", // Text color set to white
    border: "1px solid #ddd", // Optional: add a border
    boxSizing: "border-box", // Ensure padding/border don't affect width/height
    fontSize: "40px", // Adjust font size as needed
    fontWeight: "bold", // Make the text bold
    marginTop: "-15px", // Adjust this value to move the label up
  };

  const buttonStyle = {
    fontSize: "36px", // Font size
    fontWeight: "bold",
    backgroundColor: "darkgreen",
    color: "aliceblue",
    border: "solid white 2px",
    borderRadius: "15px",
    padding: "0px", // Remove padding to rely on width and height for centering
    width: "120px", // Fixed width to ensure button size
    height: "70px", // Fixed height to ensure button size
    position: "relative",
    top: "10px",
    textAlign: "center", // Center text horizontally
    lineHeight: "70px", // Center text vertically by matching height
  };

  const keepTimeStyle = {
    position: "relative",
    top: "140px",
    fontSize: "20px",
    color: "rgb(6, 100, 1)",
    fontWeight: "bold",
    height: "fit-content",
    width: "fit-content",
    borderRadius: "15px",
    backgroundColor: "rgba(240, 255, 255, 0.8)",
    border: "solid 2px rgb(2, 76, 5)",
    padding: "5px",
  };

  const Link = styled.a`
    position: absolute;
    background-color: white;
    text-align: center;
    color: darkgreen; // Text color
    font-size: 30px;
    font-weight: bolder;
    width: 180px;
    height: 70px;
    top: 30px;
    left: 10px;
    border-radius: 15px;
    border: solid darkgreen 2px; // Dark green border
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, color 0.3s; // Added transition for color

    &:hover {
      background-color: darkgreen; // Hover background color
      color: white; // Hover text color
    }
  `;

  const HeaderTitle = styled.h1`
    font-size: 4rem; /* Increased font size */
    color: white;
    margin-top: -10px;
    text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.7); /* Enhanced shadow effect */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
  `;

  const UserIcon = styled(FaUser)`
    font-size: 3rem;
    margin-right: 10px;
    color: white;

    filter: drop-shadow(
      3px 3px 5px rgba(0, 0, 0, 0.6)
    ); /* Added shadow effect */
  `;

  const InfoText = styled.p`
  font-size: 30px; /* Increased font size */
  color: white; /* Text color set to white */
  font-weight: bold; /* Bold text */
  text-align: center; /* Center text */
  margin: 20px 0; /* Margin for spacing */
    text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.8);  /* Added shadow effect */
  margin-top: -40px;
`;


  return (
    <div style={containerStyle}>
      <Link id="link_id" href="/meditation">
        Meditation Helper
      </Link>
      <HeaderTitle>
        <UserIcon /> Meditation Timer
      </HeaderTitle>
      <div className="time_class" style={timeClassStyle}>
        <div
          className="time_boxes"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            className="time-box"
            style={timeBoxStyle}
            onClick={toggleDropdown}
            ref={buttonRef}
          >
            {formatTime(hr)}:{formatTime(min)}:{formatTime(sec)}
          </div>
        </div>

        <InfoText>Tap above the timer to choose your meditation duration and start your journey!</InfoText>

        <div className="keep_time" style={keepTimeStyle}>
          {isPlaying ? "Timer is active" : "Timer is paused"}
        </div>
      </div>
      <div className="dropdown">
  {isDropdownOpen && (
    <div
      style={{
        position: "absolute",
        top: getDropdownPosition().top,
        left: getDropdownPosition().left,
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        padding: "10px",
        zIndex: 1000,
      }}
    >
      <div>
        <button onClick={handleHoursClick}>Hours</button>
        <button onClick={handleMinutesClick}>Minutes</button>
      </div>
      {isHoursMenuOpen && (
        <div>
          {Array.from({ length: 12 }, (_, i) => (
            <button key={i} onClick={() => handleHrSelect(i)}>
              {i}
            </button>
          ))}
        </div>
      )}
      {isMinutesMenuOpen && (
        <div>
          {Array.from({ length: 60 }, (_, i) => (
            <button key={i} onClick={() => handleMinSelect(i)}>
              {i}
            </button>
          ))}
        </div>
      )}
    </div>
  )}
</div>

      <button
        className="toggle-button"
        style={buttonStyle}
        onClick={handleClick}
      >
        {isPlaying ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default MeditationTimer;
