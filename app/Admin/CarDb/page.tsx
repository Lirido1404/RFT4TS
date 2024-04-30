import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import BadgeCardSpe from "@/app/(components)/BadgeCardSpe";
import Link from "next/link";
const getCars = async () => {
  try {
    const res = await fetch("/api/Cars", {
      cache: "no-store",
    });
    return res.json();
  } catch (err) {
    console.log("failed to get Cars", err);
  }
};

const truncateDescription = (description:string, maxLength:number) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
};
async function page() {
  const { cars } = await getCars();
  return (
    <div>
      <div className="grid grid-cols-3 w-[80%] mx-auto mt-12 gap-8">
        {cars.map((car:any) => {
          return (
            <div key={car._id} className=" cursor-pointer">
              <Card className="hover:shadow-lg ease-in-out duration-150">
                <CardHeader className="">
                  <div className="rounded-full">
                    <Image
                      src={car.image}
                      width={200}
                      height={200}
                      alt="bmw"
                      className=" w-16 h-16 object-cover rounded-full"
                    />
                  </div>

                  <div>
                    <CardTitle>{car.name}</CardTitle>
                    <CardDescription> {car.datesortie} </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{truncateDescription(car.description, 120)}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link href={`/Admin/CarDb/${car._id}`}>
                    <Button variant="default">Delete Car</Button>{" "}
                  </Link>
                  <BadgeCardSpe
                    emission={car.emission}
                    power={car.power}
                    perf={car.performance}
                  />
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page;
