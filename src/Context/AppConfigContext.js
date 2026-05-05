import { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_APP_CONFIG } from '../Config/appConfig';
import { API_BASE_URL } from '../Config/api';

const STORAGE_KEY = 'appConfig';

export const AppConfigContext = createContext();

const isPlainObject = value => {
  return value && typeof value === 'object' && !Array.isArray(value);
};

const mergeConfig = (base, saved) => {
  if (!isPlainObject(saved)) return base;

  return Object.keys(base).reduce((merged, key) => {
    if (Array.isArray(base[key])) {
      merged[key] = Array.isArray(saved[key]) ? saved[key] : base[key];
      return merged;
    }

    if (isPlainObject(base[key])) {
      merged[key] = mergeConfig(base[key], saved[key]);
      return merged;
    }

    merged[key] = saved[key] ?? base[key];
    return merged;
  }, {});
};

export function AppConfigProvider({ children }) {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_APP_CONFIG;

    try {
      return mergeConfig(DEFAULT_APP_CONFIG, JSON.parse(saved));
    } catch {
      return DEFAULT_APP_CONFIG;
    }
  });
  const [apiStatus, setApiStatus] = useState('loading');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    let ignore = false;

    fetch(`${API_BASE_URL}/api/config`)
      .then(response => {
        if (!response.ok) throw new Error('Config request failed');
        return response.json();
      })
      .then(remoteConfig => {
        if (ignore) return;
        const merged = mergeConfig(DEFAULT_APP_CONFIG, remoteConfig);
        setConfig(merged);
        setApiStatus('connected');
      })
      .catch(() => {
        if (!ignore) setApiStatus('offline');
      });

    return () => {
      ignore = true;
    };
  }, []);

  const updateConfig = async (nextConfig, token) => {
    const merged = mergeConfig(DEFAULT_APP_CONFIG, nextConfig);
    setConfig(merged);

    if (!token) return merged;

    const response = await fetch(`${API_BASE_URL}/api/config`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(merged),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.error || 'No se pudo guardar la configuración');
    }

    const savedConfig = mergeConfig(DEFAULT_APP_CONFIG, await response.json());
    setConfig(savedConfig);
    setApiStatus('connected');
    return savedConfig;
  };

  const resetConfig = token => {
    setConfig(DEFAULT_APP_CONFIG);
    if (token) return updateConfig(DEFAULT_APP_CONFIG, token);
    return DEFAULT_APP_CONFIG;
  };

  return (
    <AppConfigContext.Provider value={{ config, updateConfig, resetConfig, defaultConfig: DEFAULT_APP_CONFIG, apiStatus }}>
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig() {
  const context = useContext(AppConfigContext);
  if (!context) {
    throw new Error('useAppConfig debe usarse dentro de AppConfigProvider');
  }
  return context;
}
