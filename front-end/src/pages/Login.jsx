import React, { useState } from 'react';
import api from '../services/api';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);  // تخزين التوكن
      // بعد تخزين التوكن، نجيب بيانات المستخدم
      const userRes = await api.get('/auth/me');
      setUser(userRes.data);  // تحديث حالة المستخدم في App.jsx
    } catch (err) {
      setError('خطأ في البريد الإلكتروني أو كلمة المرور');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email" placeholder="البريد الإلكتروني" required
        value={email} onChange={e => setEmail(e.target.value)} />
      <input
        type="password" placeholder="كلمة المرور" required
        value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">تسجيل الدخول</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default Login;
