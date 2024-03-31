import React from 'react';
import {getAllSeries, getMyCourses, getSession} from "@/app/supabase_server";
import SeriesItem from "@/components/SeriesItem";

const Page = async() => {
  const series = await getAllSeries()
  const session = await getSession()
  const courses = await getMyCourses({
    user_id: session?.user.id!,
  })
  return (

    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          All TestSeries in One Place.
        </h2>
        <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
          Found a test series you like? You can find all of them here.
        </p>
      </div>
      <div className={"grid grid-cols-1 items-center justify-center md:grid-cols-2 lg:grid-cols-3"}>
        {series?.map((s) => (
          <SeriesItem
            key={s.id}
            s={s}
            user_id={session?.user.id}
            courses={courses}
          />
        ))}
      </div>
    </section>
  );
}

export default Page;
