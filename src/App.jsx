import { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [valid, setValid] = useState(false);
  const [previousNumber, setPreviousNumber] = useState(
    localStorage.getItem("previousNumber")
  );

  function handleOnChange(event) {
    setNumber(event.target.value);
    setValid(event.target.value.length === 10);
  }

  function onChat() {
    localStorage.setItem("previousNumber", number);
    setPreviousNumber(number); // Update state to reflect history in real-time
  }

  return (
    <div className="container">
      <nav>
        <div>
          <i className="bi bi-whatsapp"></i>RapidChat
        </div>
        <div>
          <i className="bi bi-moon-stars"></i>Theme
        </div>
      </nav>
      <main>
        <div className="card">
          <div className="card-1">
            <div className="input">
              <input type="text" placeholder="Country Code" />
            </div>
            <div className="input phoneNumber">
              <input
                onChange={handleOnChange}
                type="text"
                placeholder="Phone Number"
                value={number}
              />
              <button
                disabled={!valid}
                style={{
                  cursor: !valid ? "not-allowed" : "pointer", // Corrected cursor styles
                }}
              >
                <a
                  onClick={onChat}
                  target="_blank"
                  href={`http://wa.me/91${number}`}
                  style={{ pointerEvents: !valid ? "none" : "auto" }}
                >
                  <i className="bi bi-whatsapp"></i>Chat on WhatsApp
                </a>
              </button>
            </div>
            <div className="input phoneNumber">
              <input type="text" placeholder="User Name" />
              <button>Save</button>
            </div>
          </div>
          <div className="card-2">
            <div className="history">
              <p>History</p>
              <p>{previousNumber}</p>
            </div>
            <div className="contact">Contact</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
