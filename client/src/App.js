import './App.css';

import { 
  Routes,
  Route,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import Home from './components/Home/Home';
import { ProvideAuth } from './providers/ProvideAuth';
import RequireAuth from './components/RequireAuth/RequireAuth';

//PROTCH

function App() {
  return (
    <ProvideAuth>
      <div className="App">
        <Routes>
          <Route exact path="/" element={
            <RequireAuth redirectTo="/login">
              <Home />
            </RequireAuth>
          }/>
          <Route path="/login" element={<LoginForm/>}/>
        </Routes>
      </div>
    </ProvideAuth>
  );
}

export default App;
