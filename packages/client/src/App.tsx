import { useEffect, useState } from 'react';
import ChatBot from './components/ChatBot';

function App() {
   const [message, setMessage] = useState('');
   useEffect(() => {
      fetch('/api/hello')
         .then((res) => res.json())
         .then((data) => setMessage(data.message));
   }, []);

   return <div>
      <ChatBot />
   </div>;
}

export default App;
