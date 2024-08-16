import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [name, setName] = useState("");
  const [valid, setValid] = useState(false);
  const [contactHistory, setContactHistory] = useState([]);
  const [yourContacts, setYourContacts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("history")) {
      setContactHistory(JSON.parse(localStorage.getItem("history")));
    }
    if (localStorage.getItem("savedContacts")) {
      setYourContacts(JSON.parse(localStorage.getItem("savedContacts")));
    }
  }, []);

  function handleCountryCode(event) {
    setCountryCode(event.target.value);
  }

  function handlePhoneNumber(event) {
    setNumber(event.target.value);
    setValid(event.target.value.length === 10);
  }

  function onChat() {
    saveHistory();
  }

  function saveHistory() {
    let currentHistory = localStorage.getItem("history");

    // Check if currentHistory exists and is a valid JSON string
    if (currentHistory) {
      try {
        let historyArray = JSON.parse(currentHistory); // Parse the JSON string
        historyArray.push(countryCode + number); // Add the new number
        localStorage.setItem("history", JSON.stringify(historyArray)); // Save it back as a JSON string
        setContactHistory(historyArray); // Update state with new history
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      // Initialize with a new array and save as a JSON string
      const newHistory = [countryCode + number];
      localStorage.setItem("history", JSON.stringify(newHistory));
      setContactHistory(newHistory); // Update state with new history
    }
  }

  function saveContact() {
    let savedContacts = localStorage.getItem("savedContacts");
    if (savedContacts) {
      let savedContactsArray = JSON.parse(savedContacts);
      console.log(savedContactsArray);
      savedContactsArray.push({
        name: name,
        number: countryCode + number,
      });
      localStorage.setItem("savedContacts", JSON.stringify(savedContactsArray));
    } else {
      localStorage.setItem(
        "savedContacts",
        JSON.stringify([
          {
            name: name,
            number: countryCode + number,
          },
        ])
      );
    }
    setYourContacts(JSON.parse(localStorage.getItem("savedContacts")));
  }

  function deleteContact(contactName) {
    let allContacts = localStorage.getItem("savedContacts");
    if (allContacts) {
      allContacts = JSON.parse(allContacts);
      let remainingContacts = allContacts.filter((element, index) => {
        return contactName != element.name;
      });
      localStorage.setItem("savedContacts", JSON.stringify(remainingContacts));
      setYourContacts(JSON.parse(localStorage.getItem("savedContacts")));
    }
  }

  function deleteHistory(contactNumber) {
    let allContacts = localStorage.getItem("history");
    if (allContacts) {
      allContacts = JSON.parse(allContacts);
      let remainingContacts = allContacts.filter((element, index) => {
        return contactNumber != element;
      });
      localStorage.setItem("history", JSON.stringify(remainingContacts));
      setContactHistory(JSON.parse(localStorage.getItem("history")));
    }
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
              <input
                onChange={handleCountryCode}
                value={countryCode}
                type="text"
                placeholder="Country Code"
              />
            </div>
            <div className="input phoneNumber">
              <input
                onChange={handlePhoneNumber}
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
                  href={`http://wa.me/${countryCode + number}`}
                  style={{ pointerEvents: !valid ? "none" : "auto" }}
                >
                  <i className="bi bi-whatsapp"></i>Chat on WhatsApp
                </a>
              </button>
            </div>
            <div className="input phoneNumber">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="User Name"
              />
              <button
                disabled={!valid || name == ""}
                style={{
                  cursor: !valid || name == "" ? "not-allowed" : "pointer", // Corrected cursor styles
                }}
                onClick={saveContact}
              >
                Save
              </button>
            </div>
          </div>
          <div className="card-2">
            <div className="history">
              <p>
                History{" "}
                <i
                  onClick={() => {
                    localStorage.setItem("history", "[]");
                    setContactHistory([]);
                  }}
                  class="bi bi-trash"
                ></i>
              </p>
              {contactHistory.map((element, index) => {
                return (
                  <div>
                    <div>
                      <a
                        href={`http://wa.me/${element}`}
                        target="_blank"
                        key={index}
                      >
                        <i className="bi bi-whatsapp"></i>
                        {`${element}`}
                      </a>
                    </div>
                    <div>
                      <i
                        onClick={() => {
                          deleteHistory(element);
                        }}
                        class="bi bi-trash"
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="contact">
              <p>
                Contact{" "}
                <i
                  onClick={() => {
                    localStorage.setItem("savedContacts", "[]");
                    setYourContacts([]);
                  }}
                  class="bi bi-trash"
                ></i>
              </p>
              {yourContacts.map((element, index) => {
                return (
                  <div>
                    <div>
                      <a
                        href={`http://wa.me/${element.number}`}
                        onClick={onChat}
                        target="_blank"
                        key={index}
                      >
                        {`Name: ${element.name}`}
                        {`Number: ${element.number}`}
                      </a>
                    </div>
                    <div>
                      <i
                        onClick={() => {
                          deleteContact(element.name);
                        }}
                        class="bi bi-trash"
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
