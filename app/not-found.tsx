import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-full bg-background flex items-center justify-center flex-col gap-2">
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="text-muted-foreground">Could not find requested resource</p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
