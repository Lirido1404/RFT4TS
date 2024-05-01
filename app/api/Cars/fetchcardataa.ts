import Cars from "@/app/(models)/Carsdetail";

export async function fetchAllCars() {
  try {
    return await Cars.find();
  } catch (err) {
    throw err;
  }
}
