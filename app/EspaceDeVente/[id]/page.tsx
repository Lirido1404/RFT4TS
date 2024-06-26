import React from "react";
import "./page.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";
import BadgeCardSpe from "@/app/(components)/BadgeCardSpe";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import FeedBackForm from "@/app/(components)/FeedBackForm";
import StarsDisplay from "@/app/(components)/StarsDisplay";
import {fetchAllCars} from "@/app/api/Cars/fetchcardataa";
import {fetchAllFeedBack} from "@/app/api/FeedBack/fetchfeedbacks";
import {fetchOneCar} from "@/app/api/Cars/[id]/fetchonecardataaa";


interface Comment {
  _id: string;
  titre: string;
  nom: string;
  description: string;
  note: number;
}


const truncateDescription = (description:string, maxLength:number) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
};


interface Props {
  params: {
    id: string;
  };
}



async function page({ params }:any) {
  let car = {};
  
  const response = await fetchOneCar(params.id);
  console.log(response)

  const cars: any = await fetchAllCars(); // Définir le type explicite pour `cars`

  const selectRandomCars = () => {
    const randomCars = [];
    const totalCars: number = cars.length; // Définir le type explicite pour `totalCars`
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * totalCars);
      randomCars.push(cars[randomIndex]);
    }
    return randomCars;
  };
  const randomCars = selectRandomCars(); 

  const feedbacks:any  = await fetchAllFeedBack();

   const filteredFeedbacks = feedbacks.filter(
    (feedBack:any) => feedBack.idOfProduct == response._id
  );

  const filteredFeedbacksreverse = filteredFeedbacks.reverse(); 

  const returnLogo = () => {
    if (response.name.includes("BMW" || "bmw")) {
      return (
        <>
          <Image
            src="/Images/bmwlogo.svg"
            alt="bmw"
            height={75}
            width={75}
            className="logo"
          />
        </>
      );
    } else if (response.name.includes("Mercedes" || "mercedes")) {
      return (
        <>
          <Image
            src="/Images/mercedeslogo.svg"
            alt="bmw"
            height={75}
            width={75}
            className="logo"
          />
        </>
      );
    } else if (response.name.includes("Audi" || "audi" || "AUDI")) {
      return (
        <>
          <Image
            src="/Images/audilogo.svg"
            alt="bmw"
            height={75}
            width={75}
            className="logo"
          />
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="w-[80%] mx-auto mt-8">
      <div className=" flex justify-between items-center">
        <h1 className="pcar text-7xl font-bold">{response.name}</h1>
        {returnLogo()}
      </div>
      <div className="mt-6">
        <Button variant="destructive">Buy car</Button>
      </div>
      <div className="grid grid-cols-2 mt-10 gap-6">
        <div className="p-0">
          <Card className="hover:shadow-lg ease-in-out duration-150 w-[100%] mx-auto ">
            <CardHeader className="p-0">
              <div className="flex justify-center">
                <div className="">
                  <Image
                    src={response.image}
                    width={200}
                    height={200}
                    alt="bmw"
                    className=" w-64 object-cover rounded-b-lg"
                  />
                </div>
              </div>
              <div className="p-6">
                <CardTitle>{response.name}</CardTitle>
                <CardDescription> {response.datesortie} </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="">
                <p>{response.description}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <BadgeCardSpe
                emission={response.emission}
                power={response.power}
                perf={response.performance}
              />
            </CardFooter>
          </Card>
        </div>
        <table className="shadow hover:shadow-lg">
          <thead>
            <tr>
              <th>Spécificités</th>
              <th>Valeurs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="flex justify-between gap-2">
                  <p>Nom</p>
                  <Image
                    src="/Images/pageinfo/car1.svg"
                    alt="carsvg"
                    width={25}
                    height={25}
                  />
                </div>
              </td>
              <td className="font-bold"> {response.name} </td>
            </tr>
            <tr>
              <td>
                <div className="flex justify-between gap-2">
                  <p>Puissance</p>
                  <Image
                    src="/Images/pageinfo/engine.svg"
                    alt="carsvg"
                    width={25}
                    height={25}
                  />
                </div>
              </td>
              <td className="font-bold">{response.power}</td>
            </tr>
            <tr>
              <td>
                <div className="flex justify-between gap-2">
                  <p>Consommation</p>
                  <Image
                    src="/Images/pageinfo/consumption.svg"
                    alt="carsvg"
                    width={25}
                    height={25}
                  />
                </div>
              </td>
              <td className="font-bold">{response.consumption}</td>
            </tr>
            <tr>
              <td>
                <div className="flex justify-between gap-2">
                  <p>Emissions de CO²</p>
                  <Image
                    src="/Images/pageinfo/leaf.svg"
                    alt="carsvg"
                    width={25}
                    height={25}
                  />
                </div>
              </td>
              <td className="font-bold">{response.emission}</td>
            </tr>
            <tr>
              <td>
                <div className="flex justify-between gap-2">
                  <p>0 - 100 Km/h</p>
                  <Image
                    src="/Images/pageinfo/perf.svg"
                    alt="carsvg"
                    width={25}
                    height={25}
                  />
                </div>
              </td>
              <td className="font-bold">{response.performance}</td>
            </tr>
            <tr>
              <td>
                <div className="flex justify-between gap-2">
                  <p>Date de sortie</p>
                  <Image
                    src="/Images/pageinfo/release2.svg"
                    alt="carsvg"
                    width={25}
                    height={25}
                  />
                </div>
              </td>
              <td className="font-bold">{response.datesortie}</td>
            </tr>
            <tr>
              <td>
                <div className="flex justify-between gap-2">
                  <p>Prix</p>
                  <Image
                    src="/Images/pageinfo/price2.svg"
                    alt="carsvg"
                    width={25}
                    height={25}
                  />
                </div>
              </td>
              <td className="font-bold">{response.price} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-20">
        <h3 className="text-4xl font-bold pcar">Avis</h3>
        <Drawer>
          <DrawerTrigger>
            <h4 className="bg-orange-500 rounded-lg shadow py-2 px-4 text-white">
              Ajouter un avis
            </h4>
          </DrawerTrigger>

          <DrawerContent>
            <FeedBackForm idOfProduct={response._id} />
          </DrawerContent>
        </Drawer>
      </div>
      <div className="mt-10">
        {filteredFeedbacksreverse.length > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-4">
              {filteredFeedbacksreverse.slice(0, 3).map((feedBack:any) => {
                return (
                  <div key={feedBack._id}>
                    <Card className="hover:shadow-lg ease-in-out duration-150 w-[100%] mx-auto ">
                      <CardHeader className="p-0">
                        <div className="p-6">
                          <CardTitle>{feedBack.titre}</CardTitle>
                          <CardDescription> {feedBack.nom} </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="">
                          <p>{feedBack.description}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <StarsDisplay feedBack={feedBack.note} />
                      </CardFooter>
                    </Card>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="w-full flex justify-center ">
            <p className="text-3xl italic">
              Soyez la première personne à donner votre avis sur cette voiture !
            </p>
          </div>
        )}
      </div>

      <h2 className="text-4xl font-bold mt-20 pcar">Achats similaires</h2>

      <div className="mt-14">
        <ScrollArea className="whitespace-nowrap rounded-md border shadow hover:shadow-lg">
          <div className="flex w-max space-x-8 p-4">
             {randomCars.map((car) => {
              return (
                <div key={car._id} className="cursor-pointer">
                  <Card className="hover:shadow-lg ease-in-out duration-150 w-96">
                    <CardHeader>
                      <div className="rounded-full">
                        <Image
                          src={car.image}
                          width={200}
                          height={200}
                          alt="bmw"
                          className="w-16 h-16 object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <CardTitle>{car.name}</CardTitle>
                        <CardDescription>{car.datesortie}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{truncateDescription(car.description, 40)}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link href={`/EspaceDeVente/${car._id}`}>
                        <Button variant="destructive">View Car</Button>
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}

export default page;
