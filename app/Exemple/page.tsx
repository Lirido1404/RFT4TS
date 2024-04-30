import React from "react";
import { fetchOneCar } from "../api/Cars/[id]/fetchonecardataaa";

async function page() {
  const response = await fetchOneCar("65e889963d9c9cfcf606970d"); 

  console.log(response);

  const truerep = response;

  return (
    <div>
      <p className="text-3xl font-bold text-black"> {response.name} </p>
    </div>
  );
}

export default page;
