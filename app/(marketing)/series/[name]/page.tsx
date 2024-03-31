import React from 'react';
import SeriesDetails from "@/components/series-details";

function Page(props) {
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <SeriesDetails/>
    </section>
  );
}

export default Page;
