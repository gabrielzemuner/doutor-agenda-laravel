export type Doctor = {
  id?: string;
  name: string;
  specialty: string;
  appointment_price_in_cents: number;
  available_from_week_day: string;
  available_to_week_day: string;
  available_from_time: string;
  available_to_time: string;
};
