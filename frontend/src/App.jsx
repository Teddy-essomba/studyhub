import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchMessage() {
      const response = await fetch(
        'http://127.0.0.1:8000/api/hello/'
      );

      const data = await response.json();

      setMessage(data.message);
    }

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>StudyHub</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;