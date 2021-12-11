import './App.css';

import { 
  Routes,
  Route,
} from 'react-router-dom';

import LoginForm from './components/LoginForm/LoginForm';
import Home from './components/Home/Home';
import { ProvideAuth } from './providers/ProvideAuth';
import { UserListContext } from './providers/UserListContext';
import RequireAuth from './components/RequireAuth/RequireAuth';


//PROTCH

function App() {

  console.log("===APP RENDER===")

  return (
    <ProvideAuth>
      <div className="App">
        <Routes>
          <Route exact path="/" element={
            <RequireAuth redirectTo="/login">
              <UserListContext>
                <Home />
              </UserListContext>
            </RequireAuth>
          }/>
          <Route path="/login" element={<LoginForm/>}/>
        </Routes>
      </div>
    </ProvideAuth>
  );
}

export default App;
