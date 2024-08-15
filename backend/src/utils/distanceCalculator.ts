export function calculateDistance(
  toLatitude: string,
  toLongitude: string,
  fromLatitude: string,
  fromLongitude: string,
): number {
  const toLat = parseFloat(toLatitude);
  const toLong = parseFloat(toLongitude);
  const fromLat = parseFloat(fromLatitude);
  const fromLong = parseFloat(fromLongitude);

  const R = 6371e3;
  const φ1 = (toLat * Math.PI) / 180;
  const φ2 = (fromLat * Math.PI) / 180;
  const Δφ = ((fromLat - toLat) * Math.PI) / 180;
  const Δλ = ((fromLong - toLong) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const mDistance = R * c;
  const distance = mDistance / 1000;
  return distance;
}
