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

  //Set country code
  function handleCountryCode(event) {
    setCountryCode(event.target.value);
  }

  //check valid number
  function handlePhoneNumber(event) {
    setNumber(event.target.value);
    setValid(event.target.value.length === 10);
  }

  function onChat() {
    saveHistory();
  }

  // Save individual history
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

  // Save individual contact
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

  // Delete individual contact
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

  // Delete individual history
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

  const [bgColor, setBgColor] = useState('#1c2a18'); // Initial color

  // Function to toggle the background color
  const toggleBgColor = () => {
    setBgColor(prevColor => (prevColor === '#1c2a18' ? '#121212' : '#1c2a18'));
  };

  return (
    
    <div className="container" style={{ backgroundColor: bgColor }}>
      {/* Navbar */}
      <nav>
        <div>
          <i className="bi bi-whatsapp"></i>RapidChat
        </div>
        <div onClick={toggleBgColor}>
          <i className="bi bi-moon-stars"></i>
        </div>
      </nav>

      {/* Body */}
      <main>
        <div className="card">
          {/* country code, phone number , contact name */}
          <div className="card-1">
            {/* country code */}
            <div className="input">
              <input
                onChange={handleCountryCode}
                value={countryCode}
                type="number"
                placeholder="Country Code"
              />
            </div>
            {/* phone number */}
            <div className="input phoneNumber">
              <input
                onChange={handlePhoneNumber}
                type="number"
                placeholder="Phone Number"
                value={number}
              />
              <button
                disabled={!valid || countryCode == ""}
                style={{
                  cursor:
                    !valid || countryCode == "" ? "not-allowed" : "pointer", // Corrected cursor styles
                }}
              >
                <a
                  onClick={onChat}
                  target="_blank"
                  href={`http://wa.me/${countryCode + number}`}
                  style={{
                    pointerEvents:
                      !valid || countryCode == "" ? "none" : "auto",
                  }}
                >
                  <i className="bi bi-whatsapp"></i>Chat
                </a>
              </button>
            </div>
            {/* user name */}
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

          {/* history, contact */}
          <div className="card-2">
            <div className="history">
              <div className="historyAndcontactHeader">
                History{" "}
                <i
                  onClick={() => {
                    localStorage.setItem("history", "[]");
                    setContactHistory([]);
                  }}
                  className="bi bi-trash"
                ></i>
              </div>
              {contactHistory.map((element, index) => {
                return (
                  <div key={index} className="historyElement">
                    <div>
                      <a href={`http://wa.me/${element}`} target="_blank">
                        <i className="bi bi-whatsapp"></i>
                        {`${element}`}
                      </a>
                    </div>
                    <div>
                      <i
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          deleteHistory(element);
                        }}
                        className="bi bi-trash"
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="contact">
              <div className="historyAndcontactHeader">
                Contact{" "}
                <i
                  onClick={() => {
                    localStorage.setItem("savedContacts", "[]");
                    setYourContacts([]);
                  }}
                  className="bi bi-trash"
                ></i>
              </div>
              {yourContacts.map((element, index) => {
                return (
                  <div key={index} className="contactElement">
                    <div className="contactElementNameAndNumber">
                      <a
                        href={`http://wa.me/${element.number}`}
                        onClick={onChat}
                        target="_blank"
                      >
                        <div>
                          <i
                            className="bi bi-whatsapp"
                            style={{ marginRight: "5px" }}
                          ></i>
                          {`${element.name}`}
                        </div>
                        <div>{`${element.number}`}</div>
                      </a>
                    </div>
                    <div>
                      <i
                        onClick={() => {
                          deleteContact(element.name);
                        }}
                        className="bi bi-trash"
                        style={{ cursor: "pointer" }}
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
