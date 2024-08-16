import { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("Phone Number");

  function handleOnChange(event) {
    setNumber(event.target.value);
  }

  return (
    <div className="container">
      <nav>
        <div>
          <i class="bi bi-whatsapp"></i>RapidChat
        </div>
        <div>
          <i class="bi bi-moon-stars"></i>Theme
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
              <button>
                <a href={`http://wa.me/91${number}`}>
                  <i class="bi bi-whatsapp"></i>Chat on Watsapp
                </a>
              </button>
            </div>
            <div className="input phoneNumber">
              <input type="text" placeholder="User Name" />
              <button>Save</button>
            </div>
          </div>
          <div className="card-2">
            <div className="history">History</div>
            <div className="contact">Contact</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
