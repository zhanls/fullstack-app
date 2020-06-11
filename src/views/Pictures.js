import React, { useState } from 'react'
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

function Picture() {
  const [inProp, setInProp] = useState(false);
  return (
    <div>
      <Transition in={inProp} timeout={duration}>
        {state => (
          <img
            src={require('../assets/img/1.jpg')}
            alt="song jiang"
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }} 
          />
        )}
      </Transition>
      <button onClick={() => setInProp(true)}>
        Click to Enter
      </button>
      <button onClick={() => setInProp(false)}>
        Click to Exit
      </button>
    </div>
  );
}

export default Picture