"use client";
import { CardOne } from "@/components/CardOne";
import Image from "next/image";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import useAuth from "@/context/useAuth";
import appwriteService from "@/appwrite/config";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [currentMovie, setCurrentMovie] = useState<any>();
  const [textLoading, setTextLoading] = useState(false);

  useEffect(() => {
    let page = Math.floor(Math.random() * (200 - 1) + 1);

    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&vote_average.gte=7&with_original_language=en`,
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
          let resultSize = Math.floor(Math.random() * (19 - 3) + 3); //selecting a random pointer for window end
          setMovies(
            movies.concat(
              response.data.results.slice(resultSize - 3, resultSize) // taking 3 data from the window(size 3)
            )
          );
          if (!currentMovie) {
            setCurrentMovie(response.data.results[0]); //setting the current movie for the first time
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    if (movies.length <= 1) {
      getMovies();
    }
  }, [movies, currentMovie]);

  const handleClick = () => {
    setTextLoading(false);
    document.getElementById("hero")?.classList.add("opacity-0");
    setCurrentMovie(movies[1]);
    setMovies(movies.slice(1, movies.length));
    // setLoading(true);
  };

  // adding similar recommended movies when the movie is liked
  const handleLike = () => {
    const id = currentMovie.id;

    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmZhODNjYWEwNWI0MWRhNDcxZTc2ZmVjOTY0ZWU4ZCIsInN1YiI6IjY0OGRiZjdhNTU5ZDIyMDBjNTc2NWJmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HlLl7g10XMKzAL9ulhmQ7sdt284onAHv99LDVlZA3kw",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        let resultSize = Math.floor(Math.random() * (19 - 3) + 3);
        movies.concat(
          response.data.results.slice(resultSize - 3, resultSize) // taking 3 data from the window(size 3)
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <div className="my-auto h-screen flex flex-col py-10">
        <div
          id="hero"
          className="mt-20 flex flex-col justify-center items-center transition-opacity opacity-0 duration-200 "
        >
          <div className="relative  rounded-lg shadow-md bg-slate-500 ">
            {currentMovie && (
              <Image
                src={`https://image.tmdb.org/t/p/original${currentMovie.poster_path}`}
                width={200}
                height={280}
                alt=""
                className="z-0  rounded-md object-cover "
                onLoadingComplete={() => {
                  document
                    .getElementById("hero")
                    ?.classList.remove("opacity-0");
                  setTextLoading(true);
                }}
                priority={true}
              />
            )}
          </div>
          <div className="my-4 text-md text-slate-600 font-medium">
            {currentMovie && textLoading && currentMovie.title}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            className="my-4 p-2 text-xl border-2 border-sky-500"
            onClick={handleLike}
          >
            Like
          </button>
          <button
            className="my-4 p-2 text-xl border-2 border-sky-500"
            onClick={handleClick}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
