
import React from 'react';
import type { Theme } from '../App';

interface SettingsScreenProps {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ currentTheme, setTheme }) => {
  return (
    <div className="p-4 sm:p-6 text-slate-800 dark:text-slate-200">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Configurações</h1>

        <div className="space-y-6">
          {/* Theme Selector */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Tema</h2>
            <div className="flex space-x-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setTheme('light')}
                className={`w-full py-2 px-4 rounded-md text-sm font-bold transition-colors ${
                  currentTheme === 'light' ? 'bg-white text-blue-600 shadow' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Claro
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`w-full py-2 px-4 rounded-md text-sm font-bold transition-colors ${
                  currentTheme === 'dark' ? 'bg-slate-700 text-white shadow' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Escuro
              </button>
            </div>
          </div>

          {/* Placeholder: About */}
          <div className="opacity-50">
            <h2 className="text-lg font-semibold mb-3">Sobre</h2>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center">
                <p className="text-slate-500 dark:text-slate-400">Informações do desenvolvedor (Em breve)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
