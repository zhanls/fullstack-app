import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Picture.css'

function Picture() {
  const pictures = [1, 2, 3, 4, 5]
  return (
    <div className="picture-background">
      <TransitionGroup className="picture-container">
        {pictures.map(picture => (
          <CSSTransition
            key={picture}
            timeout={500}
            className="picture"
          >
            <img
              src={require(`../assets/img/${picture}.jpg`)}
              alt={picture}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
      <div style={{ textAlign: 'center' }}>
        <button>
          Click to do nothing <span role="img" aria-label="xixi">🤭</span>
        </button>
      </div>
    </div>
  )
}

export default Picture