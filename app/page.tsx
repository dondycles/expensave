import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-[100dv] space-y-16">
      <div className="w-full screen-padding space-y-32 mt-12">
        <div className="text-center space-y-4">
          <Logo zoom={7} strokeWidth={32} className="w-24 mx-auto" />
          <h1 className="text-4xl xs:text-6xl sm:text-8xl font-black">
            pennylist.
          </h1>
          <p className="text-muted-foreground text-xl">
            List your savings with simplicity.
          </p>
          <Button asChild className="mx-auto">
            <Link href={"/log-in"}>Get started</Link>
          </Button>
        </div>
        <div className="w-full h-fit space-y-4 ">
          <p className="text-4xl font-black text-center">Features</p>
          <div className="space-y-4 max-w-[512px] w-full mx-auto">
            <div className="w-full rounded-[--radius] border p-4">
              <p className="font-black w-fit text-2xl  pr-4">Simple</p>
              <p className="text-muted-foreground">
                Keep it as straightforward as jotting down notes on a piece of
                paper.
              </p>
            </div>
            <div className="w-full rounded-[--radius] border p-4">
              <p className="font-black w-fit text-2xl  pr-4">Dual</p>
              <p className="text-muted-foreground">
                {" "}
                Flip the script and start listing your expenses too.
              </p>
            </div>
            <div className="w-full rounded-[--radius] border border-yellow-500 bg-yellow-500/5 text-yellow-500 p-4">
              <p className="font-black w-fit text-2xl  pr-4">Customizable</p>
              <p>Bored with black and white? Then, make it colorful.</p>
            </div>
            <div className="w-full rounded-[--radius] border p-4">
              <p className="font-black w-fit text-2xl  pr-4">Analytics</p>
              <p className="text-muted-foreground">
                Dive into your progress with insightful charts and tables.
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full bg-muted screen-padding">
        <Link href={"/"} className="text-muted-foreground text-sm">
          © pennylist.
        </Link>
      </footer>
    </main>
  );
}
