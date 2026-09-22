import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Link} from "react-router";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-4 sm:p-6 font-sans">
      <main className="flex-1 flex flex-col items-center pt-8 sm:pt-12">
        <Card className="w-full max-w-md bg-card border-border shadow-md rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg font-semibold">
              ระบบลงทะเบียนเรียน CPE & ISNE
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <Button variant="secondary" size="sm" className="bg-foreground text-background hover:bg-foreground/90 text-xs sm:text-sm font-medium rounded-xl">
              <Link to="/enrollment">ไปหน้าลงทะเบียนเรียน</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
