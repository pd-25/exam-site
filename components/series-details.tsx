"use client"
import React, {useEffect} from 'react';
import {useSupabase} from "@/app/supabase_provider";
import {useParams} from "next/navigation";

function SeriesDetails() {
  const {supabase} = useSupabase()
  const [details, setDetails] = React.useState(null)
  const {name} = useParams()
  useEffect(() => {
    if (supabase) {
      supabase
        .from("series")
        .select("*")
        .eq("id", name)
        .then((data) => {
          if (data.data) {
            setDetails(data.data[0])
          }
        })
    }

  }, [supabase, name])

  return (
    <div>
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          {details?.name}
        </h2>
        <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
          {details?.description}
        </p>
      </div>
    </div>
  );
}

export default SeriesDetails;
