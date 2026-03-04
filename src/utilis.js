// Filtrar por ciudad (comparación exacta)
export function filterByCity(data, city) {
  if (!city) return data;

  return data.filter(stay => stay.city === city);
}


// Filtrar por número de huéspedes
export function filterByGuests(data, guests) {
  if (!guests || guests <= 0) return data;

  return data.filter(stay => stay.maxGuests >= guests);
}