
import Announcements from "@/components/Announcements"
import EventCalendar from "@/components/EventCalendar"
import BigCalendar from "@/components/BigCalendar"
import React from "react"
import BigCalendarContainer from "@/components/BigCalendarContainer"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

const ParentPage
  = async () => {

    const { userId } = await auth();
    const currentUserId = userId;

    const students = await prisma.student.findMany({
      where: {
        parentId: currentUserId!,
      },
    });
    return (
      <div className='flex-1 p-4 flex gap-4 flex-col xl:flex-row'>
        {/* left */}
        {students.map((student) => (
          <div className="w-full xl:w-2/3" key={student.id}>
            <div className="h-full bg-white p-4 rounded-md">
              <h1 className="font-semibold text-xl">Jadwal
                ({student.name + " " + student.surname})
              </h1>
              <BigCalendarContainer type="classId" id={student.classId} />
            </div>
          </div>
        ))}

        {/* right */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <Announcements />
        </div>
      </div>
    )
  }

export default ParentPage
