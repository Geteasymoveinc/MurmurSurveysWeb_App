import React, { useRef, useState, useCallback, useEffect } from "react";

import Webcam from "react-webcam";

import classes from "../assets/css/surveys/webcam.module.scss";
import Play from "../assets/images/play-video.png";


function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

let totalSeconds = 0;

function WebcamStreamCapture({uploadVideo}) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const [previewVideo, setPreviewVideo] = useState(null);
  const [playRecordedVideoState, setPlayRecordedVideoSsate] = useState(false);
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    if (recordedChunks.length && !capturing) {
      //const video = document.getElementById("preview");

      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      //const url = URL.createObjectURL(blob);

      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = (event) => {
        setPreviewVideo(event.target.result);
        //setRecordedChunks([]);
      };
    }
  }, [capturing, recordedChunks]);

  useEffect(() => {
    if (capturing) {
      var timer = setInterval(() => {
        ++totalSeconds;
        const secondsLabel = pad(totalSeconds % 60);
        const minutesLabel = pad(parseInt(totalSeconds / 60) % 60);
        const hoursLabel = pad(parseInt(minutesLabel / 60));

        //let normalDate = new Date(sec).toLocaleString('en-GB',{timeZone:'UTC'})

        setTime(hoursLabel + ":" + minutesLabel + ":" + secondsLabel);
      }, 1000);
    }
    return function cleanup() {
      clearInterval(timer);
    };
  });

 

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    setPreviewVideo(null);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();

    setCapturing(false);
    setTime("00:00:00");
    totalSeconds = 0;
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleUpload = useCallback(() => {
    if (previewVideo) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

        uploadVideo(blob,previewVideo)
        setRecordedChunks([])
    }
  }, [previewVideo]);

  const playVideoOnClick = () => {
    const video = document.getElementById("preview-video");
    setPlayRecordedVideoSsate(true);
    video.play();
  };

  const stopPLayingVideo = () => {
    const video = document.getElementById("preview-video");
    setPlayRecordedVideoSsate(false);
    video.pause();
  };

  return (
    <div className={classes.webcam}>
      <div className={classes["webcam__video-stream"]}>
        <div
          className={`${classes.webcam__camera} ${
            capturing || !previewVideo
              ? classes["webcam__camera--active"]
              : null
          }`}
        >
          <Webcam audio={true} ref={webcamRef} muted={true} />
        </div>
        {!capturing && previewVideo ? (
          <video
            className={`${classes["webcam__foreground"]} ${
              previewVideo && !capturing
                ? classes["webcam__foreground--active"]
                : null
            }`}
            id="preview-video"
            onEnded={() =>  setPlayRecordedVideoSsate(false)}
          >
            <source src={previewVideo} type="video/webm" />
          </video>
        ) : null}

        {playRecordedVideoState && previewVideo && !capturing ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${classes["webcam__foreground-svg"]}`}
            onClick={stopPLayingVideo}
          >
            <path
              d="M10.65 19.11V4.89C10.65 3.54 10.08 3 8.64 3H5.01C3.57 3 3 3.54 3 4.89V19.11C3 20.46 3.57 21 5.01 21H8.64C10.08 21 10.65 20.46 10.65 19.11Z"
              fill="#7F56D9"
              stroke="#7F56D9"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.0001 19.11V4.89C21.0001 3.54 20.4301 3 18.9901 3H15.3601C13.9301 3 13.3501 3.54 13.3501 4.89V19.11C13.3501 20.46 13.9201 21 15.3601 21H18.9901C20.4301 21 21.0001 20.46 21.0001 19.11Z"
              fill="#7F56D9"
              stroke="#7F56D9"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : previewVideo && !capturing ? (
          <img
            src={Play}
            alt=""
            className={`${classes["webcam__foreground-img"]}`}
            onClick={playVideoOnClick}
          />
        ) : null}
      </div>
      {capturing ? <p className={classes["webcam__timer"]}> {time}</p> : null}
      <div className={classes["webcam__ctrl-btns"]}>
        {capturing ? (
          <button
            onClick={handleStopCaptureClick}
            className={classes["webcam__stop-recording"]}
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M21.9702 12C21.9702 17.2467 17.7169 21.5 12.4702 21.5C7.22351 21.5 2.97021 17.2467 2.97021 12C2.97021 6.75329 7.22351 2.5 12.4702 2.5C17.7169 2.5 21.9702 6.75329 21.9702 12Z"
                fill="#D92D20"
                stroke="#D92D20"
              />
              <path
                d="M12.5 16.23C14.8362 16.23 16.73 14.3362 16.73 12C16.73 9.66386 14.8362 7.77002 12.5 7.77002C10.1639 7.77002 8.27002 9.66386 8.27002 12C8.27002 14.3362 10.1639 16.23 12.5 16.23Z"
                fill="#D92D20"
              />
            </svg>
            Stop recording
          </button>
        ) : (
          <button
            onClick={handleStartCaptureClick}
            className={`${classes["webcam__record-btn"]} ${
              previewVideo ? classes["webcam__record-btn--new-record"] : null
            }`}
          >
            {previewVideo ? "Record again" : "Record"}
          </button>
        )}

        {previewVideo && !capturing ? (
          <button onClick={handleUpload} className={classes.webcam__upload}>
            Upload{" "}
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.75 12H19.75M19.75 12L12.75 5M19.75 12L12.75 19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default WebcamStreamCapture;
