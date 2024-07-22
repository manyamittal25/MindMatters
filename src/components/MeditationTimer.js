import React, { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";

const MeditationTimer = () => {
  const [hr, setHr] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [isConfirmMode, setIsConfirmMode] = useState(false);
  const [isHrSet, setIsHrSet] = useState(false);
  const [isMinSet, setIsMinSet] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHoursMenuOpen, setIsHoursMenuOpen] = useState(false);
  const [isMinutesMenuOpen, setIsMinutesMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const track = new Audio("/audios/medimusic.mp3");
    if (isPlaying) {
      track.play();
    } else {
      track.pause();
      track.currentTime = 0;
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
      const { top, left, width } = buttonRef.current.getBoundingClientRect();
      return {
        top: top + window.scrollY + buttonRef.current.offsetHeight + 10,
        left: left + window.scrollX,
      };
    }
    return { top: 0, left: 0 };
  };

  const handleHrSelect = (hour) => {
    setSelectedHour(hour);
    setIsHoursMenuOpen(false);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };
  
  const handleMinSelect = (minute) => {
    setSelectedMinute(minute);
    setIsMinutesMenuOpen(false);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };
  

  const handlePause = () => {
    setIsPlaying(false);
    clearInterval(timerId); // Clear the timer when pausing
  };
  
  const handleStart = () => {
    if (hr === 0 && min === 0 && sec === 0) {
      alert("Please set a timer duration.");
      return;
    }
    setIsPlaying(true);
  };
  

  const handleConfirm = () => {
    if (selectedHour !== null && selectedMinute !== null) {
      setHr(selectedHour);
      setMin(selectedMinute);
      setSec(0);
      setIsConfirmMode(true);
    } else {
      alert("Please select both hours and minutes.");
    }
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    console.log(`Timer Updated - Hours: ${hr}, Minutes: ${min}, Seconds: ${sec}`);
  }, [hr, min, sec]);
  

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
    backgroundColor: "rgb(144, 238, 144, 0.7)",
    fontSize: "120px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "0", // Remove margin to place boxes closer together
    color: "aliceblue",
    textShadow: "4px 4px 8px rgba(8, 8, 8, 0.3)",
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
    top: "30px",
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
            className="time_box_wrapper"
            style={{ textAlign: "center", marginRight: "25px" }}
          >
            <div className="time_box" style={timeBoxStyle}>
              {formatTime(hr)}
            </div>
            <div className="additional_box" style={additionalBoxStyle}>
              Hours
            </div>
          </div>
          <div
            className="time_box_wrapper"
            style={{ textAlign: "center", marginRight: "25px" }}
          >
            <div className="time_box" style={timeBoxStyle}>
              {formatTime(min)}
            </div>
            <div className="additional_box" style={additionalBoxStyle}>
              Minutes
            </div>
          </div>
          <div className="time_box_wrapper" style={{ textAlign: "center" }}>
            <div className="time_box" style={timeBoxStyle}>
              {formatTime(sec)}
            </div>
            <div className="additional_box" style={additionalBoxStyle}>
              Seconds
            </div>
          </div>
        </div>
      </div>
      {/* <div id="warn_id" style={warnStyle}>Warning</div> */}
      <div className="btn_class" style={timeClassStyle}>
        <button ref={buttonRef} style={buttonStyle} onClick={toggleDropdown}>
          {isPlaying ? "Pause" : "Start"}
        </button>
      </div>
      <br />
      <br />
      <div id="keep_time" style={keepTimeStyle}>
        Time Record
      </div>
      {isDropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: getDropdownPosition().top,
            left: getDropdownPosition().left,
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "5px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 1000,
            display: "flex", // Use flexbox for horizontal layout
            gap: "10px", // Space between items
            padding: "10px", // Padding around the items
          }}
        >
          <div
            onClick={handleHoursClick}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              cursor: "pointer",
              whiteSpace: "nowrap", // Prevent text wrapping
            }}
          >
            Hours
          </div>
          {isHoursMenuOpen && (
            <div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>
              <div
                onClick={() => handleHrSelect(0)}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                0 hours
              </div>
              <div
                onClick={() => handleHrSelect(1)}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                1 hour
              </div>
              <div
                onClick={() => handleHrSelect(2)}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                2 hours
              </div>
              <div
                onClick={() => handleHrSelect(3)}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                3 hours
              </div>
              <div
                onClick={() => handleHrSelect(4)}
                style={{
                  padding: "10px",
                  borderBottom: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                4 hours
              </div>
            </div>
          )}
          <div
            onClick={handleMinutesClick}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Minutes
          </div>
          {isMinutesMenuOpen && (
            <div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>
              <div
                onClick={() => handleMinSelect(0)}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                0 minutes
              </div>
              <div
                onClick={() => handleMinSelect(0.1)}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                0.1 minute
              </div>
              <div
                onClick={() => handleMinSelect(10)}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                10 minutes
              </div>
              <div
                onClick={() => handleMinSelect(20)}
                style={{
                  padding: "10px",
                  borderBottom: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                20 minutes
              </div>
            </div>
          )}
          <button
            onClick={handleConfirm}
            style={{
              width: "auto",
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default MeditationTimer;
