import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Login from './components/Login.jsx';
import IdeaList from './components/ideas/IdeaList.jsx';
import IdeaDetail from './components/ideas/IdeaDetail.jsx';
import DealList from './components/deals/DealList.jsx';
import DealDetail from './components/deals/DealDetail.jsx';
import ThesesList from './components/business/ThesesList.jsx';
import ThesesDetail from './components/business/ThesesDetail.jsx';
import BusinessList from './components/business/BusinessList.jsx';
import BusinessDetail from './components/business/BusinessDetail.jsx';
import ContactList from './components/contacts/ContactList.jsx';
import ContactDetail from './components/contacts/ContactDetail.jsx';
import Home from './components/home/Home.jsx';
import Header from './components/Header.jsx';

import { useAuthContext } from './context/AuthContext';

function App() {
  const { authUser } = useAuthContext();

  return (
    <Router>
      <AppRoutes authUser={authUser} />
    </Router>
  );
}

// Separate component for the routes and conditional header rendering
function AppRoutes({ authUser }) {
  const location = useLocation();

  return (
    <>
      {/* Conditionally render Header unless the route is /login */}
      {location.pathname !== '/login' && authUser && <Header />}

      <Routes>
        <Route path="/login" element={authUser ? <Navigate to="/home" /> : <Login />} />
        <Route path='/home' element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path='/ideas' element={authUser ? <IdeaList /> : <Navigate to="/login" />} />
        <Route path='/ideas/:id' element={authUser ? <IdeaDetail /> : <Navigate to="/login" />} />
        <Route path='/deals' element={authUser ? <DealList /> : <Navigate to="/login" />} />
        <Route path='/deals/:id' element={authUser ? <DealDetail /> : <Navigate to="/login" />} />
        <Route path='/theses' element={authUser ? <ThesesList /> : <Navigate to="/login" />} />
        <Route path='/theses/:id' element={authUser ? <ThesesDetail /> : <Navigate to="/login" />} />
        <Route path='/theses/companies/:id' element={authUser ? <BusinessList /> : <Navigate to="/login" />} />
        <Route path='/company/:id' element={authUser ? <BusinessDetail /> : <Navigate to="/login" />} />
        <Route path='/contacts' element={authUser ? <ContactList /> : <Navigate to="/login" />} />
        <Route path='/contacts/:id' element={authUser ? <ContactDetail /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
