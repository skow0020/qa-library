import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DefaultLayout from 'layouts/Default';
import LibraryLogin from 'views/LibraryLogin/LibraryLogin';
import Registration from 'views/Registration/Registration';
import { useState, useEffect } from 'react';
import './App.css';
import { ProtectedRoute } from 'Protected';

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/checkToken')
    .then(res => {
      if (res.status === 200) setisLoggedIn(true);
    });
  }, []);

  return (
    <Router>
      <div>
        <Routes >
          <Route path="/library-login" element={<LibraryLogin />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<ProtectedRoute isLoggedIn={isLoggedIn}><DefaultLayout /></ProtectedRoute>} />
        </Routes >
      </div>
    </Router>
  );
}

export default App;