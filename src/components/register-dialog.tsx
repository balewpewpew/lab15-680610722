import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { courses } from "@/lib/mock-data";
import type { Student , Enrollment } from "@/lib/types";

interface RegisterDialogProps {
  currentStudent: Student;
  enrollment: Enrollment[];
  onEnroll: (courseId: string,enrolledTime: string) => void;
}

export function RegisterDialog({currentStudent,enrollment,onEnroll}:RegisterDialogProps) {
  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");
  const [Time,setTime] = useState("");
  useEffect(()=>{
    if(open){
      const now = new Date();
      const hours = String(now.getHours()).padStart(2,"0");
      const minutes = String(now.getMinutes()).padStart(2,"0");
      setTime(`${hours}:${minutes}`);
      setCourseId("");
    }
  },[open]);
  const availableCourses = courses.filter((c)=>!enrollment.some((e)=>e.courseId === c.courseId));
  const selectedCourse = courses.find((c) => c.courseId === courseId);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload
    if(!courseId) return;
    const now = new Date();
    const [h,min] = Time.split(":");
    if(h&&min){
      now.setHours(parseInt(h,10),parseInt(min,10));
    }
    onEnroll(courseId,now.toISOString());
    setCourseId(""); // เคลียร์ฟอร์ม
    setOpen(false); // ปิด Dialog
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ปุ่มที่กดแล้วเปิด Dialog */}
      <DialogTrigger
        render={
          <Button className="gap-2">
          <UserPlus className="w-4 h-4"/>
          ลงทะเบียน
        </Button>
        }
      />

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>
              เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="courseSelect">วิชา</Label>
            <Select 
              value={courseId} 
              onValueChange={(val: string | null) => setCourseId(val ?? "")}
            >
              
              <SelectTrigger className="w-full min-w-0 overflow-hidden rounded-xl border border-input bg-background px-3 py-2 text-sm text-left">
                <SelectValue placeholder="เลือกวิชา" className="truncate block" >
                  {selectedCourse ? `${selectedCourse.courseId} - ${selectedCourse.courseTitle}` : undefined}
                </SelectValue>
              </SelectTrigger>

              
              <SelectContent className="rounded-xl border border-border bg-popover text-popover-foreground shadow-md max-h-60 overflow-y-auto w-[var(--radix-select-trigger-width)]">
                {availableCourses.map((c) => (
                  <SelectItem 
                    key={c.courseId} 
                    value={c.courseId} 
                    className="rounded-lg py-2.5 px-3 text-sm whitespace-normal break-words leading-snug cursor-pointer focus:bg-accent focus:text-accent-foreground"
                  >
                    {c.courseId} - {c.courseTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          

          <div className="space-y-2">
            <Label htmlFor="time">เวลา</Label>
            <Input 
              id="time" 
              type="time" 
              value={Time} 
              onChange={(e)=>setTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อนศ.</Label>
            <Input 
              id="fullName" 
              type="text" 
              value={`${currentStudent.firstName} ${currentStudent.lastName}`} 
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Program">โปรแกรม</Label>
            <Input 
              id="Program" 
              type="text" 
              value={currentStudent.program} 
              readOnly
              className="bg-muted"
            />
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              disabled={!courseId}>
              ยืนยันการลงทะเบียนเรียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
