import { useState } from 'react';
import { BookOpen, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import API from '../api/axios';

export default function LoginPage({ onLogin }) {
  const [loginMethod, setLoginMethod] = useState('email');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      if (isRegister) {
        const payload = { name, password };
        if (loginMethod === 'email') payload.email = email;
        else payload.phone = phone;
        response = await API.post('/auth/register', payload);
      } else {
        const identifier = loginMethod === 'email' ? email : phone;
        response = await API.post('/auth/login', { identifier, password });
      }

      const { token, ...user } = response.data;
      onLogin(user, token);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#f4ecd8] via-[#e8dcc4] to-[#d7cbb1]">
      <div className="w-full max-w-md">
        <div className="bg-[#faf6ed] rounded-lg shadow-2xl border-4 border-[#6d4c41] p-8 relative overflow-hidden">
          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#8d6e63] opacity-30"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#8d6e63] opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#8d6e63] opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#8d6e63] opacity-30"></div>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-[#6d4c41] rounded-full shadow-lg">
                <BookOpen className="w-12 h-12 text-[#faf6ed]" />
              </div>
            </div>
            <h1 className="text-4xl font-serif text-[#3e2723] mb-1">அறிவு விதை</h1>
            <h2 className="text-2xl font-serif text-[#6d4c41] mb-1">ARIVUVITHAI</h2>
            <p className="text-sm text-[#5d4037] italic">Begin Your Journey of Wisdom</p>
          </div>

          {/* Login / Register Toggle */}
          <div className="flex gap-2 mb-4 bg-[#d7ccc8] p-1 rounded">
            <button
              onClick={() => { setIsRegister(false); setError(''); }}
              className={`flex-1 py-2 px-4 rounded transition-all text-sm font-medium ${!isRegister ? 'bg-[#6d4c41] text-[#faf6ed]' : 'text-[#5d4037]'}`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsRegister(true); setError(''); }}
              className={`flex-1 py-2 px-4 rounded transition-all text-sm font-medium ${isRegister ? 'bg-[#6d4c41] text-[#faf6ed]' : 'text-[#5d4037]'}`}
            >
              Register
            </button>
          </div>

          {/* Email / Phone Toggle */}
          <div className="flex gap-2 mb-5 bg-[#d7ccc8] p-1 rounded">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-4 rounded flex items-center justify-center gap-2 transition-all text-sm ${loginMethod === 'email' ? 'bg-[#6d4c41] text-[#faf6ed]' : 'text-[#5d4037]'}`}
            >
              <Mail className="w-4 h-4" /> Email
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2 px-4 rounded flex items-center justify-center gap-2 transition-all text-sm ${loginMethod === 'phone' ? 'bg-[#6d4c41] text-[#faf6ed]' : 'text-[#5d4037]'}`}
            >
              <Phone className="w-4 h-4" /> Phone
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-300 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (only for register) */}
            {isRegister && (
              <div>
                <label className="block text-sm mb-1 text-[#3e2723]">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 bg-[#faf6ed] border-2 border-[#8d6e63] rounded focus:outline-none focus:ring-2 focus:ring-[#6d4c41] text-[#3e2723]"
                />
              </div>
            )}

            {/* Email or Phone */}
            {loginMethod === 'email' ? (
              <div>
                <label className="block text-sm mb-1 text-[#3e2723]">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-4 py-3 bg-[#faf6ed] border-2 border-[#8d6e63] rounded focus:outline-none focus:ring-2 focus:ring-[#6d4c41] text-[#3e2723]"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm mb-1 text-[#3e2723]">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full px-4 py-3 bg-[#faf6ed] border-2 border-[#8d6e63] rounded focus:outline-none focus:ring-2 focus:ring-[#6d4c41] text-[#3e2723]"
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm mb-1 text-[#3e2723]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d6e63]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-10 py-3 bg-[#faf6ed] border-2 border-[#8d6e63] rounded focus:outline-none focus:ring-2 focus:ring-[#6d4c41] text-[#3e2723]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8d6e63]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#6d4c41] text-[#faf6ed] rounded hover:bg-[#5d4037] transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Begin Learning Journey'}
            </button>
          </form>
        </div>

        <div className="h-2 bg-[#5d4037] opacity-20 rounded-b-lg mx-2"></div>
        <div className="h-2 bg-[#5d4037] opacity-10 rounded-b-lg mx-4"></div>
      </div>
    </div>
  );
}
