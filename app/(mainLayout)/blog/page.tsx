import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function page() {
  return (
    <div className="p-12 max-h-screen w-full flex gap-8 flex-col">
      <div className=" mt-14 text-center flex flex-col items-center gap-2">
        <h1 className="text-4xl font-semibold tracking-wide mb-4">
          Find your passion in useless cards!
        </h1>
        <p className="font-light tracking-wider mb-1">
          blog cards are made to make us waste time.
        </p>
        <Separator className="border-b-1 border-gray-900 max-w-md mb-7 " />
      </div>
      <Suspense fallback={<Loading />}>
        <CallBackPosts />
      </Suspense>
    </div>
  );
}
function Loading() {
  return (
    <div className=" grid gap-7 text-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <Card
            key={item}
            className="pb-2 pt-0 border-t-lg  border-b-lg border-1 border-gray-900"
          >
            <CardHeader className="pt-4 px-4 ">
              <Skeleton className="w-full h-40 rounded-t-lg" />
            </CardHeader>
            <CardContent className="h-26 flex flex-col mt-4">
              <Skeleton className="w-3/5 h-6 mb-3 rounded-full" />
              <Skeleton className="h-6 w-90 rounded-full" />
            </CardContent>
            <Skeleton className="w-20 h-4 ml-2" />
          </Card>
        );
      })}
    </div>
  );
}

async function CallBackPosts() {
  const posts = await fetchQuery(api.blogPosts.getPosts);
  return (
    <div className=" grid gap-7 pb-9 text-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      {posts?.map((item) => {
        return (
          <Card
            key={item._id}
            className="pb-2 pt-0 border-t-lg  border-b-lg border-1 border-gray-900"
          >
            <CardHeader className="overflow-hidden px-0 pt-0 h-45 object-cover">
              <Image
                alt="img"
                src={"/images/i3.jpg"}
                height={700}
                width={1200}
              />
            </CardHeader>
            {/* <CardContent className="h-26 flex flex-col mt-8"> */}
            <CardContent className="pb-2 flex flex-col ">
              <Link
                href={`/blog/${item._id}`}
                className=" text-2xl  mb-2 font-semibold hover:text-pink-300/90"
              >
                {item.title}
              </Link>
              <p className="font-md  text-muted-foreground/50 ">
                {item.content}
              </p>
            </CardContent>
            <Link
              href={`/blog/${item._id}`}
              className=" hover:text-pink-300/90 text-left ml-3 text-[14px] w-fit"
            >
              Read more...
            </Link>
          </Card>
        );
      })}
    </div>
  );
}
