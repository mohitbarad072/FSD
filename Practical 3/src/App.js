import { useEffect, useState } from 'react';

function App() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Set interval to update date every second
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const currentDate = date.toLocaleDateString();
  const currentTime = date.toLocaleTimeString();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to CHARUSAT!!!!</h1>
      <h2>It is {currentDate}</h2>
      <h2>It is {currentTime}</h2>
    </div>
  );
}

export default App;