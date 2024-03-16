import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-full flex  screen-padding ">
      <div className="m-auto">
        <h1 className="text-4xl xs:text-6xl sm:text-8xl font-black">
          pennylist.
        </h1>
        <p>List your savings with simplicity.</p>
        <div className="flex flex-row gap-2 mt-4">
          <Link href={"/log-in"} className="flex-1">
            <Button className="w-full">Get Started</Button>
          </Link>
          <Link href={"/learn-more"} className="flex-1">
            <Button variant={"outline"} className="w-full">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
