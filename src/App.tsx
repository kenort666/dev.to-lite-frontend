import axios from 'axios';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IAuthResponse } from './@types';
import { API_URL } from './api';
import { Header } from './components/Header/Header';
import { FullPost } from './pages/FullPost';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { WritePost } from './pages/WritePost';
import { useAuth } from './store';

export const App: React.FC = () => {
  const saveUser = useAuth((state) => state.saveUser);
  const authUser = useAuth((state) => state.authUser);

  const getTokensFromData = async () => {
    const res = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem('token', res.data.accessToken);
    authUser();
    saveUser(res.data);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getTokensFromData();
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/writePost" element={<WritePost />} />
        <Route path="/posts/:id/edit" element={<WritePost />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/tags/:name" element={<Home />} />
      </Routes>
    </>
  );
};
