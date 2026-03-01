import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Globe, Mail, Phone, MapPin, CreditCard, Users, FileText, Save, Upload, X, Check, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
];

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
];

const timezones = [
  'UTC-12:00 (Baker Island)',
  'UTC-11:00 (American Samoa)',
  'UTC-10:00 (Hawaii)',
  'UTC-09:00 (Alaska)',
  'UTC-08:00 (Pacific Time - Los Angeles)',
  'UTC-07:00 (Mountain Time - Denver)',
  'UTC-06:00 (Central Time - Chicago)',
  'UTC-05:00 (Eastern Time - New York)',
  'UTC-04:00 (Atlantic Time - Halifax)',
  'UTC-03:00 (Buenos Aires)',
  'UTC-02:00 (Mid-Atlantic)',
  'UTC-01:00 (Azores)',
  'UTC+00:00 (London - Dublin)',
  'UTC+01:00 (Paris - Berlin - Rome)',
  'UTC+02:00 (Cairo - Johannesburg)',
  'UTC+03:00 (Moscow - Riyadh)',
  'UTC+04:00 (Dubai - Baku)',
  'UTC+05:00 (Karachi - Tashkent)',
  'UTC+05:30 (New Delhi - Mumbai)',
  'UTC+06:00 (Dhaka - Almaty)',
  'UTC+07:00 (Bangkok - Jakarta)',
  'UTC+08:00 (Beijing - Singapore - Perth)',
  'UTC+09:00 (Tokyo - Seoul)',
  'UTC+10:00 (Sydney - Melbourne)',
  'UTC+11:00 (Solomon Islands - Noumea)',
  'UTC+12:00 (New Zealand - Auckland)',
  'UTC+13:00 (Fiji - Samoa)',
  // African Timezones
  'UTC-01:00 (Cape Verde - Praia)',
  'UTC+00:00 (Dakar - Accra - Monrovia)',
  'UTC+01:00 (Casablanca - Algiers - Tunis)',
  'UTC+02:00 (Lagos - Nairobi - Kampala - Addis Ababa)',
  'UTC+02:00 (Harare - Lusaka - Maputo)',
  'UTC+03:00 (Khartoum - Asmara)',

  'UTC+04:00 (Mauritius - Port Louis)',
  'UTC+02:00 (Johannesburg - Pretoria)',
  'UTC+01:00 (Windhoek)',
  // Additional Major Cities
  'UTC-03:00 (São Paulo - Rio de Janeiro)',
  'UTC-05:00 (Mexico City - Bogotá)',
  'UTC-04:00 (Caracas - La Paz)',
  'UTC+07:00 (Ho Chi Minh City - Manila)',
  'UTC+09:30 (Adelaide - Darwin)',
  'UTC+05:45 (Kathmandu)',
  'UTC+03:30 (Tehran)',
  'UTC+06:30 (Yangon)',
  'UTC+08:45 (Eucla - Australia)'
];

export default function CompanyProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [profile, setProfile] = useState({
    // Basic Info
    companyName: '',
    legalName: '',
    description: '',
    website: '',
    logo: null,
    
    // Legal & Tax
    businessType: 'LLC', // LLC, Corporation, Sole Proprietorship, Partnership
    taxId: '',
    vatNumber: '',
    registrationNumber: '',
    
    // Contact
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    
    // International Settings
    defaultCurrency: 'USD',
    supportedCurrencies: ['USD'],
    defaultLanguage: 'en',
    supportedLanguages: ['en'],
    timezone: 'UTC+00:00 (London)',
    
    // Payment
    bankName: '',
    bankAccount: '',
    swiftCode: '',
    routingNumber: '',
    iban: '',
    
    // Shipping
    shippingZones: [],
    freeShippingThreshold: 0,
    
    // Team
    employees: [],
    companySize: '1-10' // 1-10, 11-50, 51-200, 201-500, 500+
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      // Simuler chargement depuis l'API
      setTimeout(() => {
        setProfile(prev => ({
          ...prev,
          companyName: 'Shopora Inc.',
          legalName: 'Shopora International Ltd.',
          description: 'Global e-commerce platform for modern businesses',
          website: 'https://shopora.com',
          email: 'contact@shopora.com',
          country: 'US'
        }));
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load profile');
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      // Simuler sauvegarde API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addCurrency = (currency) => {
    if (!profile.supportedCurrencies.includes(currency)) {
      setProfile(prev => ({
        ...prev,
        supportedCurrencies: [...prev.supportedCurrencies, currency]
      }));
    }
  };

  const removeCurrency = (currency) => {
    if (currency !== profile.defaultCurrency) {
      setProfile(prev => ({
        ...prev,
        supportedCurrencies: prev.supportedCurrencies.filter(c => c !== currency)
      }));
    }
  };

  const addLanguage = (language) => {
    if (!profile.supportedLanguages.includes(language)) {
      setProfile(prev => ({
        ...prev,
        supportedLanguages: [...prev.supportedLanguages, language]
      }));
    }
  };

  const removeLanguage = (language) => {
    if (language !== profile.defaultLanguage) {
      setProfile(prev => ({
        ...prev,
        supportedLanguages: prev.supportedLanguages.filter(l => l !== language)
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Company Profile</h1>
          <p className="text-slate-500 mt-1">Manage your international business settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl flex items-center gap-2"
        >
          <Check className="h-4 w-4" />
          Profile saved successfully!
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl flex items-center gap-2"
        >
          <AlertCircle className="h-4 w-4" />
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-500" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Company Name</label>
                <input
                  type="text"
                  value={profile.companyName}
                  onChange={(e) => setProfile(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="Shopora Inc."
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Legal Name</label>
                <input
                  type="text"
                  value={profile.legalName}
                  onChange={(e) => setProfile(prev => ({ ...prev, legalName: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="Shopora International Ltd."
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  value={profile.description}
                  onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 text-slate-900"
                  placeholder="Describe your business..."
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Website</label>
                <input
                  type="url"
                  value={profile.website}
                  onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="https://shopora.com"
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Company Logo</label>
                <div className="flex items-center gap-4">
                  {profile.logo ? (
                    <div className="relative">
                      <img src={profile.logo} alt="Logo" className="h-12 w-12 rounded-xl object-cover" />
                      <button
                        onClick={() => setProfile(prev => ({ ...prev, logo: null }))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                      <Upload className="h-4 w-4" />
                      <span className="text-sm text-slate-700">Upload Logo</span>
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Legal & Tax Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              Legal & Tax Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Business Type</label>
                <select
                  value={profile.businessType}
                  onChange={(e) => setProfile(prev => ({ ...prev, businessType: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                >
                  <option value="LLC">LLC</option>
                  <option value="Corporation">Corporation</option>
                  <option value="Sole Proprietorship">Sole Proprietorship</option>
                  <option value="Partnership">Partnership</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Tax ID / EIN</label>
                <input
                  type="text"
                  value={profile.taxId}
                  onChange={(e) => setProfile(prev => ({ ...prev, taxId: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="12-3456789"
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">VAT Number</label>
                <input
                  type="text"
                  value={profile.vatNumber}
                  onChange={(e) => setProfile(prev => ({ ...prev, vatNumber: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="FR12345678901"
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Registration Number</label>
                <input
                  type="text"
                  value={profile.registrationNumber}
                  onChange={(e) => setProfile(prev => ({ ...prev, registrationNumber: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="123456789"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-500" />
              Contact Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="contact@shopora.com"
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Address</label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="123 Business Street"
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">City</label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="New York"
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">State/Province</label>
                <input
                  type="text"
                  value={profile.state}
                  onChange={(e) => setProfile(prev => ({ ...prev, state: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="NY"
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Postal Code</label>
                <input
                  type="text"
                  value={profile.postalCode}
                  onChange={(e) => setProfile(prev => ({ ...prev, postalCode: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="10001"
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Country</label>
                <input
                  type="text"
                  value={profile.country}
                  onChange={(e) => setProfile(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="US"
                />
              </div>
            </div>
          </div>

          {/* International Settings */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              International Settings
            </h2>
            
            <div className="space-y-6">
              {/* Currencies */}
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-3">Currencies</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Default Currency</label>
                    <select
                      value={profile.defaultCurrency}
                      onChange={(e) => setProfile(prev => ({ ...prev, defaultCurrency: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                    >
                      {currencies.map(curr => (
                        <option key={curr.code} value={curr.code}>
                          {curr.symbol} {curr.code} - {curr.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Add Currency</label>
                    <select
                      onChange={(e) => addCurrency(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                      defaultValue=""
                    >
                      <option value="" disabled>Add currency...</option>
                      {currencies.filter(curr => !profile.supportedCurrencies.includes(curr.code)).map(curr => (
                        <option key={curr.code} value={curr.code}>
                          {curr.symbol} {curr.code}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {profile.supportedCurrencies.map(currency => (
                    <div
                      key={currency}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                    >
                      {currency}
                      {currency !== profile.defaultCurrency && (
                        <button
                          onClick={() => removeCurrency(currency)}
                          className="hover:text-blue-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-3">Languages</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Default Language</label>
                    <select
                      value={profile.defaultLanguage}
                      onChange={(e) => setProfile(prev => ({ ...prev, defaultLanguage: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                    >
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Add Language</label>
                    <select
                      onChange={(e) => addLanguage(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                      defaultValue=""
                    >
                      <option value="" disabled>Add language...</option>
                      {languages.filter(lang => !profile.supportedLanguages.includes(lang.code)).map(lang => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {profile.supportedLanguages.map(language => {
                    const lang = languages.find(l => l.code === language);
                    return (
                      <div
                        key={language}
                        className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium"
                      >
                        {lang?.flag} {lang?.name}
                        {language !== profile.defaultLanguage && (
                          <button
                            onClick={() => removeLanguage(language)}
                            className="hover:text-green-900"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Timezone</label>
                <select
                  value={profile.timezone}
                  onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                >
                  {timezones.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-500" />
              Payment Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Bank Name</label>
                <input
                  type="text"
                  value={profile.bankName}
                  onChange={(e) => setProfile(prev => ({ ...prev, bankName: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="Chase Bank"
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Account Number</label>
                <input
                  type="text"
                  value={profile.bankAccount}
                  onChange={(e) => setProfile(prev => ({ ...prev, bankAccount: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="****1234"
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">SWIFT Code</label>
                <input
                  type="text"
                  value={profile.swiftCode}
                  onChange={(e) => setProfile(prev => ({ ...prev, swiftCode: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="CHASUS33"
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Routing Number</label>
                <input
                  type="text"
                  value={profile.routingNumber}
                  onChange={(e) => setProfile(prev => ({ ...prev, routingNumber: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="021000021"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">IBAN (International)</label>
                <input
                  type="text"
                  value={profile.iban}
                  onChange={(e) => setProfile(prev => ({ ...prev, iban: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  placeholder="GB82WEST12345698765432"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Size */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              Company Size
            </h3>
            <select
              value={profile.companySize}
              onChange={(e) => setProfile(prev => ({ ...prev, companySize: e.target.value }))}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
            >
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="500+">500+ employees</option>
            </select>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-black mb-4">Global Reach</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-90">Currencies</span>
                <span className="font-bold">{profile.supportedCurrencies.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-90">Languages</span>
                <span className="font-bold">{profile.supportedLanguages.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-90">Timezone</span>
                <span className="font-bold text-xs">{profile.timezone.split('(')[1]?.replace(')', '') || 'UTC'}</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="text-sm font-black text-amber-800 mb-2">💡 Pro Tip</h3>
            <p className="text-xs text-amber-700 leading-relaxed">
              Enable multiple currencies and languages to expand your global reach. Customers are 4x more likely to buy when shopping in their native language and currency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
