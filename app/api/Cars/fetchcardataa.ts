import Cars from "@/app/(models)/Carsdetail";

export async function fetchAllCars() {
  try {
    const cars = await Cars.find();
    return cars; // Retourner directement les données des voitures
  } catch (err) {
    console.error("Failed to get infos about cars", err);
    throw err; // Renvoyer l'erreur pour qu'elle soit gérée ailleurs
  }
}
