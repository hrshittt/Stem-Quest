import React, { useState } from 'react';
import { useLang } from '../i18n.jsx'

const SignupPage = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { t } = useLang()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Store token
      localStorage.setItem('token', data.token);
      
      // Redirect to home
      setCurrentPage('home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-32">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/vid.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

      {/* Signup Form */}
      <div className="relative z-10 w-full max-w-sm px-4 mt-16">
        <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/30">
          <h1 className="text-4xl font-bold mb-8 text-center text-stem-blue">{t('signUp')}</h1>
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">{t('email')}</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-stem-blue focus:border-transparent text-white"
                placeholder={t('email')}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">{t('password')}</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-stem-blue focus:border-transparent text-white"
                placeholder={t('password')}
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-stem-blue hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              {t('signUp')}
            </button>
            <div className="text-center text-sm text-gray-300">
              <span>{t('alreadyAccount')} </span>
              <button
                type="button"
                onClick={() => setCurrentPage('login')}
                className="text-stem-blue hover:text-blue-400 font-medium transition duration-300"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
