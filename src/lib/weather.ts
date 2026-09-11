import { useState, useEffect } from 'react';

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  condition: string;
  isDay: boolean;
  windSpeed: number;
  loading: boolean;
  error: boolean;
}

// Coordonnées géographiques de Ndoh-Djuttitsa / Nkong-Ni / Bafou (Menoua)
const LATITUDE = 5.45;
const LONGITUDE = 10.05;

// Interprétation des codes WMO Open-Meteo en français pour le climat de montagne
export function getWeatherCondition(code: number): string {
  if (code === 0) return 'Ensoleillé';
  if (code >= 1 && code <= 3) return 'Partiellement nuageux';
  if (code === 45 || code === 48) return 'Brume matinale';
  if (code >= 51 && code <= 55) return 'Bruine légère';
  if (code >= 61 && code <= 65) return 'Pluie de montagne';
  if (code >= 80 && code <= 82) return 'Averses d altitude';
  if (code >= 95) return 'Orage';
  return 'Ciel couvert';
}

export function useLiveWeather(): WeatherData {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 19,
    weatherCode: 3,
    condition: 'Brume matinale',
    isDay: true,
    windSpeed: 3,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchLiveWeather() {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current_weather=true`
        );
        if (!response.ok) throw new Error('Échec du chargement de la météo');

        const data = await response.json();
        const current = data.current_weather;

        if (isMounted && current) {
          setWeather({
            temperature: Math.round(current.temperature),
            weatherCode: current.weathercode,
            condition: getWeatherCondition(current.weathercode),
            isDay: Boolean(current.is_day),
            windSpeed: Math.round(current.windspeed),
            loading: false,
            error: false,
          });
        }
      } catch (err) {
        console.error('Erreur Météo Open-Meteo:', err);
        if (isMounted) {
          setWeather((prev) => ({ ...prev, loading: false, error: true }));
        }
      }
    }

    fetchLiveWeather();

    // Rafraîchissement automatique toutes les 15 minutes
    const interval = setInterval(fetchLiveWeather, 15 * 60 * 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return weather;
}
