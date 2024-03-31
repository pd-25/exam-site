import { Book, BookOpen, ListCollapseIcon, Star, Timer } from "lucide-react"

import ClassItem from "@/components/ClassItem"
import EmblaCarousel from "@/components/embla-carousel"

import { getAllBanners, getAllClassrooms } from "../supabase_server"

export default async function IndexPage() {
  const banners = await getAllBanners()
  const classrooms = await getAllClassrooms()

  return (
    <>
      <section className="space-y-6 pb-8 md:pb-12 lg:py-2">
        <div className="container mt-20">
          <EmblaCarousel
            slides={banners!}
            options={{
              loop: true,
            }}
          />
        </div>
      </section>
      <section
        id="about"
        className="container space-y-6 bg-slate-50 py-8 md:py-12 lg:py-24 dark:bg-transparent"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-2xl capitalize leading-[1.1] sm:text-3xl md:text-5xl">
            India&apos;s Top Coaching Institute for UPSC CSE
          </h2>
          <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
            We provide comprehensive General Studies Foundation Course, Prelims
            & Mains Test Series, One-to-One Mentorship, Current Affairs and much
            more to help you achieve your IAS Dream.
          </p>
        </div>
      </section>
      <section
        id="classroom"
        className="container space-y-6 bg-slate-50 py-8 md:py-12 lg:py-10 dark:bg-transparent"
      >
        <div className="mx-auto flex flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-2xl capitalize leading-[1.1] sm:text-3xl md:text-5xl">
            ClassRooms
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {classrooms?.map((classroom) => {
              return <ClassItem key={classroom.id} classroom={classroom} />
            })}
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 md:py-12 lg:py-24 dark:bg-transparent"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl capitalize leading-[1.1] sm:text-3xl md:text-6xl">
            Why choose us
          </h2>
          <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
            voluptatem, est natus asperiores vero aperiam obcaecati minima
            delectus. Accusantium quidem fuga consequatur necessitatibus hic
            ipsa mollitia fugit beatae aliquid, asperiores atque impedit cumque,
            debitis totam alias excepturi veritatis, expedita obcaecati?
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="bg-background relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Book className="size-12" />
              <div className="space-y-2">
                <h3 className="font-bold capitalize">Subject wise analysis</h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Perferendis, sapiente. Cumque aliquid quia nemo dolorem eius
                  laudantium impedit fugit vero adipisci
                </p>
              </div>
            </div>
          </div>
          <div className="bg-background relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Timer className="size-12" />
              <div className="space-y-2">
                <h3 className="font-bold capitalize">Time Management</h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis ipsa, quod delectus molestiae necessitatibus sapiente
                  a aliquid dignissimos doloribus alias.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-background relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <ListCollapseIcon className="size-12" />
              <div className="space-y-2">
                <h3 className="font-bold capitalize">Detailed Solutions</h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  incidunt quibusdam voluptatum quis placeat vel exercitationem
                  quia hic ullam suscipit!{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-background relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Star className="size-12" />
              <div className="space-y-2">
                <h3 className="font-bold capitalize">All India Rank</h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Accusantium expedita mollitia ut et debitis quaerat facilis
                  quae minus, deleniti quas.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-background relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <BookOpen className="size-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Innovative Teaching Practices</h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  Immerse yourself in a dynamic learning environment where
                  innovation meets education. Our coaching center employs modern
                  teaching techniques, harnessing technology and interactive
                  sessions to enhance comprehension and retention.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-background relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="size-12 fill-current">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Proven Success Stories</h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  Discover a legacy of triumph as our students consistently
                  secure admissions to top-tier colleges. Their success stories
                  stand testament to the effectiveness of our coaching
                  methodologies and unwavering commitment to nurturing academic
                  excellence.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
