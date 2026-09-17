import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { X, Database, ShieldCheck, RefreshCw, Key, Sparkles } from 'lucide-react';

export function FirebaseConfigModal({ isOpen, onClose }) {
  const { isFirebaseConfigured } = useAuth();
  const { handleSeedData } = useApp();

  const [apiKey, setApiKey] = useState(import.meta.env.VITE_FIREBASE_API_KEY || '');
  const [authDomain, setAuthDomain] = useState(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '');
  const [projectId, setProjectId] = useState(import.meta.env.VITE_FIREBASE_PROJECT_ID || '');
  const [appId, setAppId] = useState(import.meta.env.VITE_FIREBASE_APP_ID || '');
  const [seeding, setSeeding] = useState(false);

  if (!isOpen) return null;

  const handleSaveCustomConfig = () => {
    const configObj = { apiKey, authDomain, projectId, appId };
    localStorage.setItem('calaw_custom_firebase_config', JSON.stringify(configObj));
    alert("Firebase settings saved! Refreshing page to initialize Firebase SDK...");
    window.location.reload();
  };

  const handleClearCustomConfig = () => {
    localStorage.removeItem('calaw_custom_firebase_config');
    alert("Custom Firebase settings cleared.");
    window.location.reload();
  };

  const triggerSeed = async () => {
    setSeeding(true);
    await handleSeedData();
    setSeeding(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100">Firebase Backend & Auth</h3>
            <p className="text-xs text-slate-400">Manage Firestore & Google Auth credentials</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-semibold ${
          isFirebaseConfigured 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
        }`}>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>{isFirebaseConfigured ? 'Firebase Active & Connected' : 'Running in Offline / LocalStorage Mode'}</span>
          </div>
        </div>

        {/* Firestore Seed Action */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Firestore Data Seeding
            </span>
            <button
              onClick={triggerSeed}
              disabled={seeding}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs shadow-md transition-all disabled:opacity-50"
            >
              {seeding ? 'Seeding...' : 'Seed Data to Firestore'}
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Populates initial CA Foundation Business Law chapters, topics, and examiner flashcards directly into your Firestore collections.
          </p>
        </div>

        {/* Custom Config Form */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
            <Key className="w-3.5 h-3.5 text-amber-400" /> Custom Firebase Web App Keys (Optional)
          </span>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="API Key (VITE_FIREBASE_API_KEY)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3.5 py-2.5 focus:border-amber-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Project ID (VITE_FIREBASE_PROJECT_ID)"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3.5 py-2.5 focus:border-amber-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="App ID (VITE_FIREBASE_APP_ID)"
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3.5 py-2.5 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={handleClearCustomConfig}
            className="text-xs text-rose-400 hover:underline font-semibold"
          >
            Clear Custom Keys
          </button>

          <button
            onClick={handleSaveCustomConfig}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-xl text-xs transition-all"
          >
            Save & Re-initialize
          </button>
        </div>

      </div>
    </div>
  );
}
