import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState([]);

  const apiHost = process.env.REACT_APP_API_HOST || "http://localhost:8000";

  useEffect(() => {      
    axios.get(`${apiHost}/deskbook`).then((response) => {

      setEntries(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`${apiHost}/deskbook`, { name, message }).then((response) => {
      axios.get(`${apiHost}/deskbook`).then((response) => {
        setEntries(response.data);
        setName("");
        setMessage("");
      });
    });
  };

  const isFormEmpty = () => {
    return !name.trim() || !message.trim();
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">Desk Entry Form</h1>
        <form class="bg-white rounded-lg shadow-lg p-4 mb-4 w-full max-w-lg" onSubmit={handleSubmit}>
          <div>
            <label class="text-gray-700" htmlFor="name">Name:</label>
            <input
              class="form-input mt-1 block w-full"
              id="name"
              type="text"
              value={name}
              placeholder="Enter name here"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label class="text-gray-700" htmlFor="message">Message:</label>
            <textarea
              class="form-input mt-1 block w-full"
              id="message"
              value={message}
              placeholder="Enter the reason for the visit here"
              onChange={(event) => setMessage(event.target.value)}
            ></textarea>
          </div>
          <button disabled={isFormEmpty()} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
        </form>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">Guest Entries</h1>
        {entries.map((entry) => (
          <div
            key={entry._id}
            className="bg-white rounded-lg shadow-lg p-4 mb-4 w-full max-w-lg"
          >
            <p className="text-xl font-bold mb-2">{entry.name}</p>
            <p className="text-gray-700 text-sm mb-2">{entry.email}</p>
            <p className="text-gray-700">{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
