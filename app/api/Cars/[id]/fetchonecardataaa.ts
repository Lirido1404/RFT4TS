import { NextResponse } from "next/server";
import Cars from "@/app/(models)/Carsdetail";

export async function fetchOneCar(params:any) {
  try {
    const id = params;
    return await Cars.findOne({ _id: id });

    } catch (err) {
    console.error("Erreur lors de la recherche de la voiture:", err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

