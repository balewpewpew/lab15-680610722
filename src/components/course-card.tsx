import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  onDelete?: () => void;
};
function formatTime(dateString?: string){
  if(!dateString) return "";
  const date = new Date(dateString);
  if(isNaN(date.getTime())) return dateString;
  const thaiMonths = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
  ];

  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543; // แปลง ค.ศ. เป็น พ.ศ.
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}

export function CourseCard({ course, student, enrolledAt ,onDelete}: CourseCardProps) {
  const isEnrolled = Boolean(enrolledAt);
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <CardTitle className="text-base">{course.courseTitle}</CardTitle>
          <CardDescription>
            รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
          </CardDescription>
        </div>
        <Badge
        className={
          isEnrolled 
          ? "bg-amber-100 text-amber-800 border-amber-300 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800 shrink-0"
          : "bg-purple-100 text-purple-800 border-purple-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800 shrink-0"
        }
        variant="outline">
          {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
        </Badge>
      </CardHeader>
      {isEnrolled && (
        <CardContent className="flex items-end justify-between">
        <div className="text-xs text-muted-foreground">
          <p>
            ชื่อ นศ.: {student.firstName} {student.lastName}
          </p>
          <p>โปรแกรม: {student.program}</p>
          <p>ลงทะเบียนเมื่อ: {formatTime(enrolledAt)}</p>
        </div>
      {onDelete && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-8 w-8"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      )}
      </CardContent>)}
    </Card>
  );
}
