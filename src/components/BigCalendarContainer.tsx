import prisma from "@/lib/prisma"
import BigCalendar from "./BigCalendar"
import { adjustScheduleToCurrentWeek } from "@/lib/utils"

const BigCalendarContainer = async ({
  type,
  id
}: {
  type: "teacherId" | "classId",
  id: string | number
}) => {

  const dataRes = await prisma.lesson.findMany({
    where: {
      ...type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }
    }
  })

  const data = dataRes.map(lesson => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }))

  const schedule = adjustScheduleToCurrentWeek(data);
  return (
    <div>
      <BigCalendar data={schedule} />
      <div className="flex justify-around border-gray border-2 text-sm bg-[#f7fdff]">
        <p className="border-black">Jam</p>
        <p className="border-black">Minggu</p>
        <p className="border-black">Senin</p>
        <p className="border-black">Selasa</p>
        <p className="border-black">Rabu</p>
        <p className="border-black">Kamis</p>
        <p className="border-black">Jumat</p>
        <p className="border-black">Sabtu</p>
      </div>
    </div>
  )
}

export default BigCalendarContainer