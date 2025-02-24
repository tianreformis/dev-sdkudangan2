"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import {
  lessonSchema,
  LessonSchema,
} from "@/lib/formValidationSchemas";
import {
  createLesson,
  updateLesson,
} from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Lesson } from "@prisma/client";

const LessonFormPage = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any | undefined;
}) => {
  const {
    register,
    handleSubmit,
    watch, 
    setValue,
    formState: { errors },
  } = useForm<LessonSchema>({
    resolver: zodResolver(lessonSchema),
  });

  // AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useFormState(
    type === "create" ? createLesson : updateLesson,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const startTime = watch ("startTime");
    useEffect(() => {
      if (startTime) {
        const date = new Date(startTime);  
        const daysMap: Record<number, "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"> = {
          0: "SUNDAY",
          1: "MONDAY",
          2: "TUESDAY",
          3: "WEDNESDAY",
          4: "THURSDAY",
          5: "FRIDAY",
          6: "SATURDAY",
        };  
        const selectedDay = daysMap[date.getDay()]; // 
        if (selectedDay !== "SUNDAY") {
          setValue("day", selectedDay); // 
        }
      }
    }, [startTime, setValue]);

  const formatDateToLocal = ({date} : {date:Date}) => {
    if (!date) return "";
    const localDate = new Date(date);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(localDate.getDate()).padStart(2, '0');
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const { classes,subjects,teachers } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Buat Pembelajaran" : "Perbaharui Pembelajaran"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nama Pembelajaran"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Hari</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("day")}
            defaultValue={data?.day}
          >
            <option value="MONDAY">Senin</option>
            <option value="TUESDAY">Selasa</option>
            <option value="WEDNESDAY">Rabu</option>
            <option value="THURSDAY">Kamis</option>
            <option value="FRIDAY">Jumat</option>
            <option value="SATURDAY">Sabtu</option>
            
          </select>
          {errors.day?.message && (
            <p className="text-xs text-red-400">
              {errors.day.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Waktu Mulai"
          name="startTime"
          defaultValue={formatDateToLocal({date: data?.startTime})}
          register={register}
          error={errors?.startTime}
          type="datetime-local"
        />
        <InputField
          label="Waktu Selesai"
          name="endTime"
          defaultValue={formatDateToLocal({date: data?.endTime})}
          register={register}
          error={errors?.endTime}
          type="datetime-local"
        />
        
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Mapel</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("subjectId")}
            defaultValue={data?.subjectId}
          >
            {subjects.map(
              (subject: { id: string; name: string; surname: string }) => (
                <option
                  value={subject.id}
                  key={subject.id}
                  selected={data && data.id === data.subjectId}
                >
                  {subject.name}
                </option>
              )
            )}
          </select>
          {errors.subjectId?.message && (
            <p className="text-xs text-red-400">
              {errors.subjectId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Guru</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("teacherId")}
            defaultValue={data?.teacherId}
          >
            {teachers.map(
              (teacher: { id: string; name: string; surname: string }) => (
                <option
                  value={teacher.id}
                  key={teacher.id}
                  selected={data && data.id === data.subjectId}
                >
                  {teacher.name}
                </option>
              )
            )}
          </select>
          {errors.subjectId?.message && (
            <p className="text-xs text-red-400">
              {errors.subjectId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Kelas</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("classId")}
            defaultValue={data?.classId}
          >
            {classes.map(
              (classSub: { id: string; name: string;}) => (
                <option
                  value={classSub.id}
                  key={classSub.id}
                  selected={data && data.classId === data.classId}
                >
                  {classSub.name}
                </option>
              )
            )}
          </select>
          {errors.classId?.message && (
            <p className="text-xs text-red-400">
              {errors.classId.message.toString()}
            </p>
          )}
        </div>
       
      </div>
      {state.error && (
        <span className="text-red-500">Ada yang salah!</span>
      )}
      <button className="bg-blue-400 rounded-md py-2 text-white hover:bg-blue-300">
      {type === "create" ? "Create" : "Update"}
    </button>
    </form>
  );
};

export default LessonFormPage;