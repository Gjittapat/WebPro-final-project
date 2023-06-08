import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddItem from './pages/AddItem'
import ItemDetail from './pages/ItemDetail'
import UserCollection from './pages/UserCollection'
import NewNav from './components/NewNav'
//test comp
import TestComponent from './components/TestComponent'
import AdminReq from './pages/AdminReq'
import CollectedItemDetail from './pages/CollectedItemDetail'
import AdminAllReq from './pages/AdminAllReq'

function App() {
  const { user } = useAuthContext()
  console.log("user", user)

  return (
    <div className="App">
      <BrowserRouter>
        <NewNav />
        <div className="pages">
          <Routes>
            <Route
              path="/additem"

              element={user ? <AddItem /> : <Navigate to="/login" />}

            />
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/test"
              element={user ? <TestComponent /> : <Navigate to="/login" />}
            />
            <Route
              path="/itemdetail/:id"
              element={user ? <ItemDetail /> : <Navigate to="/login" />}
            />
            <Route
              path="/collecteditemdetail/:id"
              element={user ? <CollectedItemDetail /> : <Navigate to="/login" />}
            />
            <Route
              path="/usercollection"
              element={user ? <UserCollection /> : <Navigate to="/login" />}
            />
            <Route
              path="/pendingrequests"
              element={user ? <AdminReq /> : <Navigate to="/login" />}
            />
            <Route
              path="/requests"
              element={user ? <AdminAllReq /> : <Navigate to="/login" />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
