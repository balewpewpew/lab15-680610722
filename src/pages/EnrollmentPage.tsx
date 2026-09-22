import { CourseCard } from "@/components/course-card";
import { useState } from "react";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent, enrollments } from "@/lib/mock-data";
import type { Enrollment, Student } from "@/lib/types";

export default function Enrollment() {
  const [student] = useState<Student>(currentStudent);
  const [enroll,setEnrollments] = useState<Enrollment[]>(enrollments);
  const handleEnroll = (courseId:string,enrollTime:string)=>{
    const newEnrollment: Enrollment = {
      courseId: courseId,
      studentId: student.studentId,
      enrolledAt: enrollTime,
    };
    setEnrollments((prev)=>[...prev,newEnrollment]);
  }
  const handleUnenroll = (courseId: string) => {
    setEnrollments((prev) => prev.filter((e) => e.courseId !== courseId));
  };
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 space-y-6">
        {/* Header Section: ชื่อหัวข้อ, ข้อมูล นศ. ด้านซ้าย และปุ่มกดด้านขวา */}
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              รายวิชาทั้งหมด
            </h1>
            <p className="text-sm text-muted-foreground">
              {student.firstName} {student.lastName} ({student.studentId})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <RegisterDialog
               currentStudent={student}
               enrollment={enroll}
               onEnroll={handleEnroll}
            />
          </div>
        </header>

        {/* รายการการ์ดวิชา */}
        <section className="flex flex-col gap-3.5">
          {courses.map((course) => {
            const enrolledItem = enroll.find((e) => e.courseId === course.courseId);
            return (
              <CourseCard
                key={course.courseId}
                course={course}
                student={student}
                enrolledAt={enrolledItem?.enrolledAt}
                onDelete={
                  enrolledItem
                    ? () => handleUnenroll(course.courseId)
                    : undefined
                }
            />
          );
        })}
        </section>
      </div>
    </main>
  );
}