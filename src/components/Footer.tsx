import { type FooterProps } from "@/lib/Footer";
export default function Footer({ fullName, studentId }: FooterProps) {
  return (
    <footer className="align-self-end  text-center w-full">
      <p className="bg-secondary text-secondary-foreground text-xs py-2.5 px-4 m-0 font-normal">
        จัดทำโดย {fullName} รหัสนักศึกษา {studentId}
      </p>
    </footer>
  );
}
