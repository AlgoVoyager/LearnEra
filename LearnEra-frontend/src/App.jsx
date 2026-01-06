import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import { AuthPage, AdminPage, Homepage, ProfilePage, CoursesPage, Navbar, Footer } from "./manifest.js"
import {UserContextProvider} from './context/userContext.jsx'
const App = () => {
  return (
    <BrowserRouter>
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<PageLayout />}>
                  <Route index element={<Homepage />} />
                  <Route path='profile' element={<ProfilePage />} />
                  <Route path='courses' element={<CoursesPage />} />
                  <Route path='auth' element={<AuthPage />} />
                  <Route path='admin' element={<AdminPage />} />
                </Route>
            </Routes>
        </UserContextProvider>
    </BrowserRouter>
  );
}
const PageLayout = () => {
  return (
    <>
      <Navbar />
      <main><Outlet /></main> {/* Outlet renders the matched child route's element */}
      <Footer />
    </>
  );
}

export default App