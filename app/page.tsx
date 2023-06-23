"use client";
import { CardOne } from "@/components/CardOne";

export default function Home() {
  return (
    <div className="mx-4 my-2 ">
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center my-8 ">
          <CardOne />
        </div>
      </div>
    </div>
  );
}
