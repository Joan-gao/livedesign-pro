import React from 'react';
import './EventPage.css';

function EventPage() {
  return ( 
    <div className="eventpage">
      <div className="container-chat">
        <div className="top-navbar">
          <h2>Event Page Generator</h2>
        </div>

        <div className="container-ai">
          {/* Ai Text Responses */}
          <p className='user'>AI Bot</p>
          <div className="ai-response">
            <p>Rotogravure, Lola's mind is like a short stack of pancakes. 256 color radial laser  ray bg --v 6.0 --s 250</p>
            <div className="grid-poster"></div>
          </div>

          {/* Ai Design Output */}
          <div className="ai-output">
            <div className="output-item">
            <button className='btn-edit'>Edit</button>
            </div>

            <div className="output-item">
            <button className='btn-edit'>Edit</button>
            </div>

            <div className="output-item">
            <button className='btn-edit'>Edit</button>
            </div>

            <div className="output-item">
            <button className='btn-edit'>Edit</button>
            </div>
          </div>
        </div>

        <div className="bottom-chatbox">
          <div className="user-options">
            <button className='btn-option1'>Select</button>
            <button className='btn-option2'>Regenerate</button>
          </div>
          <input className='container-prompt'
            type="text"
            placeholder="Enter your text here"
            value=""
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
  
}

export default EventPage;
