import { useRef, useEffect, useState } from "react";

import classes from "../assets/css/surveys/audio-recorder.module.scss";
import "../assets/css/surveys/voice-recorder-ui.scss";
import "../assets/css/antd/range-slider.scss";

import { Slider } from "antd";

let timer = null;

function AudioPlayer({ audio, keyProp }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    timer = setInterval(() => {
      if (audioRef.current.ended) {
        audioRef.current.pause();
        setIsPlaying(false);
        setCurrentTime(Math.floor(audioRef.current.duration));
      } else if (isPlaying) {
        setCurrentTime(audioRef.current.currentTime.toFixed(2));
      }
    }, 100);

    return function cleanup() {
      clearInterval(timer);
    };
  });



  return (
    <div className={classes["audio-recorder"]}>
      <div className={classes["audio-recorder__ctrl-btns"]}>
        <button
          onClick={() => {
            if (isPlaying) {
              audioRef.current.pause();

              setIsPlaying(false);
            } else {
              audioRef.current.play();
              setIsPlaying(true);
            }
          }}
        >
          {" "}
          {!isPlaying ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 11.9999V8.43989C4 4.01989 7.13 2.2099 10.96 4.4199L14.05 6.1999L17.14 7.9799C20.97 10.1899 20.97 13.8099 17.14 16.0199L14.05 17.7999L10.96 19.5799C7.13 21.7899 4 19.9799 4 15.5599V11.9999Z"
                fill="#7F56D9"
                stroke="#7F56D9"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"

              //onClick={stopPLayingVideo}
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
          )}
        </button>
      </div>

      <div className="icon-wrapper mb-0">
        <Slider
          id="audio"
          min={0}
          max={audioRef.current ? Math.floor(audioRef.current.duration) : 0}
          step={1}
          value={currentTime}
          tooltip={{
            open: false,
          }}
          onChange={(value) => {
            /*this.setState((state) => {
                      return {
                        ...state,
                        survey_settings: {
                          ...state.survey_settings,
                          target_audience: {
                            ...state.survey_settings.target_audience,
                            income: { min: value[0], max: value[1] },
                          },
                        },
                      };
                    });*/
          }}
        />
      </div>
      <audio
        controls
        ref={audioRef}
        key={keyProp}
        preload="metadata"
        onLoadedMetadata={e => {
          const duration = e.target.duration;
          if (duration === Infinity) {
           const newAudio = new Audio(audio)
            audioRef.current = newAudio
            return;
          }
          setCurrentTime(Math.floor(duration));
        }}

      >
        <source src={audio} />
      </audio>

      <div className={classes["audio-recorder__recording-time"]}>
        {currentTime}
      </div>
    </div>
  );
}

export default AudioPlayer;
