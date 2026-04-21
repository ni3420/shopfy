import React, { useState, useContext } from 'react';
import { User, Package, MapPin, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';
import { UseContextApi } from "../Context/UseContextApi";
import authService from '../AppWrite/auth';
import { Navigate } from 'react-router-dom';
import AddressForm from './Address';
import CartPage from './CartPage';

const Profile = () => {
  const { user,  } = useContext(UseContextApi);
  const [activeTab, setActiveTab] = useState('Info');
  

  const menuItems = [
    { id: 'Info', label: 'My Information', icon: <User size={20} /> },
    { id: 'Orders', label: 'My Orders', icon: <Package size={20} /> },
    { id: 'Addresses', label: 'Addresses', icon: <MapPin size={20} /> },
    { id: 'Wishlist', label: 'Cart', icon: <Heart size={20} /> },
    // { id: 'Settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Info': return <InfoView user={user} />;
      case 'Orders': return <div className="p-6">Implement this Processing...</div>;
      case 'Addresses': return <AddressForm/>;
      case 'Cart': return <CartPage/>;
      // case 'Settings': return <div className="p-6">Account Settings...</div>;
      default: return <InfoView user={user} />;
    }
  };

  const logout=async()=>{
    const res= await authService.logout()
    if(res)
    {
        <Navigate to="/"/>
    }
    return res


  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Profile Sidebar */}
        <aside className="w-full md:w-80 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 text-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg shadow-emerald-500/20">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold dark:text-white">{user?.name}</h2>
            <p className="text-sm text-slate-500 truncate">{user?.email}</p>
          </div>

          <nav className="bg-white dark:bg-slate-900 rounded-3xl p-3 shadow-sm border border-slate-100 dark:border-slate-800">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all duration-200 group ${
                  activeTab === item.id 
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3 font-semibold text-sm">
                  {item.icon}
                  {item.label}
                </div>
                <ChevronRight size={16} className={activeTab === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} />
              </button>
            ))}
            
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 p-3 mt-2 text-red-500 font-semibold text-sm rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 min-h-[500px]">
          {renderContent()}
        </main>

      </div>
    </div>
  );
};

const InfoView = ({ user }) => (
  <div className="p-8 space-y-6">
    <h3 className="text-2xl font-bold dark:text-white mb-6">Profile Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DetailItem label="Full Name" value={user?.name} />
      <DetailItem label="Email Address" value={user?.email} />
      <DetailItem label="User ID" value={user?.$id} />
      <DetailItem label="Account Status" value="Active Verified" color="text-emerald-500" />
    </div>
    <button className="mt-8 px-6 py-2.5 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl font-bold text-sm hover:scale-[0.98] transition-all">
      Edit Profile
    </button>
  </div>
);

const DetailItem = ({ label, value, color = "text-slate-900 dark:text-white" }) => (
  <div className="space-y-1">
    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
    <p className={`text-base font-semibold ${color}`}>{value || 'Not provided'}</p>
  </div>
);

export default Profile;