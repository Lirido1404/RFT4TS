import Cars from "@/app/(models)/Carsdetail"; // Assurez-vous que le chemin est correct

export async function fetchOneCar(id: string) {
  try {
    console.log(id);
    const car = await Cars.findOne({ _id: id });
    console.log(car);
    return car;
  } catch (err) {
    console.error("Erreur lors de la recherche de la voiture:", err);
    throw new Error("Erreur lors de la recherche de la voiture");
  }
}
