"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

function Page() {
  const [movies, setMovies] = useState<any>();

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmZhODNjYWEwNWI0MWRhNDcxZTc2ZmVjOTY0ZWU4ZCIsInN1YiI6IjY0OGRiZjdhNTU5ZDIyMDBjNTc2NWJmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HlLl7g10XMKzAL9ulhmQ7sdt284onAHv99LDVlZA3kw",
      },
    };

    const getMovies = () => {
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setMovies(response.data.results);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    getMovies();
  }, []);

  return (
    <div className="flex flex-col my-4">
      {movies &&
        movies.map((item: any) => (
          <div
            className={`flex flex-col justify-center items-center  my-4 h-screen snap-start`}
            key={item.id}
          >
            <div
              className="z-[-1] absolute h-screen w-screen opacity-80"
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original${item.poster_path}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(4px)",
              }}
            ></div>
            <div className="relative h-[350px] w-[250px] rounded-lg shadow-lg bg-slate-500 ">
              <Image
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt=""
                className="z-0 h-full w-full rounded-md object-cover "
                fill={true}
                loading="lazy"
              />
            </div>
            <div className="my-4 text-xl max-w-[200px] text-center">
              {item.title}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Page;
