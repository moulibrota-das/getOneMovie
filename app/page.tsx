import { CardOne } from "@/components/CardOne";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-4 my-2 ">
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center my-8 ">
          <CardOne />
        </div>
      </div>
    </div>
  );
}
