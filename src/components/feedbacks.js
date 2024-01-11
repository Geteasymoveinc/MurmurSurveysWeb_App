import React from 'react';

import ReactDOM from 'react-dom';

function SuccessFeedback({ feedback, showFeedback }) {
  return ReactDOM.createPortal(
    <div
      className={`feedback__success  ${
        showFeedback ? 'feedback__success--show' : 'feedback__success--hide'
      }`}
    >
      <div className="d-flex align-items-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle opacity="0.7" cx="24" cy="24" r="24" fill="#039855" />
          <path
            d="M29.3337 20L22.0003 27.3333L18.667 24"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p>{feedback}</p>
      </div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 8C1 7.72386 1.22386 7.5 1.5 7.5L13.2929 7.5L10.1464 4.35355C9.95118 4.15829 9.95118 3.84171 10.1464 3.64645C10.3417 3.45118 10.6583 3.45118 10.8536 3.64645L14.8536 7.64645C15.0488 7.84171 15.0488 8.15829 14.8536 8.35355L10.8536 12.3536C10.6583 12.5488 10.3417 12.5488 10.1464 12.3536C9.95118 12.1583 9.95118 11.8417 10.1464 11.6464L13.2929 8.5H1.5C1.22386 8.5 1 8.27614 1 8Z"
          fill="white"
        />
      </svg>
    </div>,
    document.getElementById('feedback'),
  );
}

function ErrorFeedback({ showFeedback, feedback }) {
  return ReactDOM.createPortal(
    <div
      className={`feedback__error  ${
        showFeedback ? 'feedback__error--show' : 'feedback__error--hide'
      }`}
    >
      <div className="d-flex align-items-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle opacity="0.7" cx="24" cy="24" r="24" fill="#D92D20" />
          <path
            d="M28 20L20 28M20 20L28 28"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p>{feedback ? feedback : 'Something went wrong'}</p>
      </div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 8C1 7.72386 1.22386 7.5 1.5 7.5L13.2929 7.5L10.1464 4.35355C9.95118 4.15829 9.95118 3.84171 10.1464 3.64645C10.3417 3.45118 10.6583 3.45118 10.8536 3.64645L14.8536 7.64645C15.0488 7.84171 15.0488 8.15829 14.8536 8.35355L10.8536 12.3536C10.6583 12.5488 10.3417 12.5488 10.1464 12.3536C9.95118 12.1583 9.95118 11.8417 10.1464 11.6464L13.2929 8.5H1.5C1.22386 8.5 1 8.27614 1 8Z"
          fill="white"
        />
      </svg>
    </div>,
    document.getElementById('feedback'),
  );
}

function WarningFeedback({ showFeedback, feedback }) {
  return ReactDOM.createPortal(
    <div
      className={`feedback__warning  ${
        showFeedback ? 'feedback__warning--show' : 'feedback__warning--hide'
      }`}
    >
      <div className="d-flex align-items-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle opacity="0.7" cx="24" cy="24" r="24" fill="#DC6803" />
          <g clipPath="url(#clip0_1294_14268)">
            <path
              d="M23.9997 26.6666V24M23.9997 21.3333H24.0063M30.6663 24C30.6663 27.6819 27.6816 30.6666 23.9997 30.6666C20.3178 30.6666 17.333 27.6819 17.333 24C17.333 20.3181 20.3178 17.3333 23.9997 17.3333C27.6816 17.3333 30.6663 20.3181 30.6663 24Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_1294_14268">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="translate(16 16)"
              />
            </clipPath>
          </defs>
        </svg>

        <p>{feedback}</p>
      </div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 8C1 7.72386 1.22386 7.5 1.5 7.5L13.2929 7.5L10.1464 4.35355C9.95118 4.15829 9.95118 3.84171 10.1464 3.64645C10.3417 3.45118 10.6583 3.45118 10.8536 3.64645L14.8536 7.64645C15.0488 7.84171 15.0488 8.15829 14.8536 8.35355L10.8536 12.3536C10.6583 12.5488 10.3417 12.5488 10.1464 12.3536C9.95118 12.1583 9.95118 11.8417 10.1464 11.6464L13.2929 8.5H1.5C1.22386 8.5 1 8.27614 1 8Z"
          fill="white"
        />
      </svg>
    </div>,
    document.getElementById('feedback'),
  );
}

export { SuccessFeedback, ErrorFeedback, WarningFeedback };
