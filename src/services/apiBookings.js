import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, Cabins(name), guests(fullName, email)"
    );

  if (error) {
    console.error(error);
    throw new Error(
      "Bookings could not be loaded"
    );
  }

  return data;
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, Cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that were created after the given date.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error(
      "Bookings could not be loaded"
    );
  }

  return data;
}

// Returns all STAYS that were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error(
      "Bookings could not be loaded"
    );
  }

  return data;
}

// Activity means that there is a check-in or a check-out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "*, guests(fullName, nationality, countryFlag)"
    )
    .or(
      `and(status.eq.unconfirmed, startDate.eq.${getToday()}), and(status.eq.checked-in, endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error(
      "Bookings could not be loaded"
    );
  }

  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(
      "Booking could not be updated"
    );
  }

  return data;
}

export async function deleteBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(
      "Booking could not be deleted"
    );
  }

  return data;
}
