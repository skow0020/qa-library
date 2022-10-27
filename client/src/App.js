import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DefaultLayout from 'layouts/Default';
import LibraryLogin from 'views/LibraryLogin/LibraryLogin';
import Registration from 'views/Registration/Registration';
import './App.css';
import useToken from 'hooks/useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <LibraryLogin setToken={setToken} />;
  }

  return (
    <Router>
      <div>
        <Routes >
          <Route path="/library-login" element={<LibraryLogin />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<DefaultLayout />} />
        </Routes >
      </div>
    </Router>
  );
}

export default App;