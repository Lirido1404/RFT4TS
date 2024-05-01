import { NextResponse } from "next/server";
import Cars from "@/app/(models)/Carsdetail";

export async function fetchAllCars() {
  try {
    return await Cars.find();
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to get infos about cars", err },
      { status: 500 }
    );
  }
}
