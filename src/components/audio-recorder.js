import { useEffect, useRef } from "react";
import { useAudioRecorder, AudioRecorder } from "react-audio-voice-recorder";

import classes from "../assets/css/surveys/audio-recorder.module.scss";
import "../assets/css/surveys/voice-recorder-ui.scss";

function AudioRecorderComponent({onFinishRecording}) {



  const recorderControls = useAudioRecorder();



  const addAudioElement = (blob) => {

   console.log(blob)
    onFinishRecording(blob)
  };


  return (
    <div className={classes["audio-recorder"]}>
      {recorderControls.isRecording ? (
        <div className={classes["audio-recorder__ctrl-btns"]}>
          {" "}
          <button onClick={recorderControls.stopRecording}>
            {" "}
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
            Stop{" "}
          </button>{" "}
          <button onClick={recorderControls.togglePauseResume}>
            {" "}
            {recorderControls.isPaused ? (
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
      ) : (
        <button onClick={recorderControls.startRecording}>
          {" "}
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
        </button>
      )}
      <div className="custom-voice-recorder-ui">
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
          showVisualizer={true}
        />
      </div>
      <div className={classes["audio-recorder__recording-time"]}>
        {recorderControls.recordingTime}
      </div>
    </div>
  );
}

export default AudioRecorderComponent;
