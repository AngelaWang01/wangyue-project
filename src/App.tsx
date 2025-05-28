import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AudioProvider } from './contexts/AudioContext';
import { LanguageProvider } from './contexts/LanguageContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TranslationPage from './pages/TranslationPage';
import ChatPage from './pages/ChatPage';
import GuidancePage from './pages/GuidancePage';
import MedicationPage from './pages/MedicationPage';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AudioProvider>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/translation" element={<TranslationPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/guidance" element={<GuidancePage />} />
              <Route path="/medication" element={<MedicationPage />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </AuthProvider>
        </AudioProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App