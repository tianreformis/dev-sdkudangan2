"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  newStudentSchema,
  NewStudentSchema,
  studentSchema,
  StudentSchema,
  TeacherSchema,
} from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import {
  createNewStudent,
  createStudent,
  updateNewStudent,
  updateStudent,
} from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";

const PPDBForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewStudentSchema>({
    resolver: zodResolver(newStudentSchema),
  });

  const [img, setImg] = useState<any>();
  const [imgAktaKelahiran, setImgAktaKelahiran] = useState<any>();
  const [imgKartuKeluarga, setImgKartuKeluarga] = useState<any>();

  const [state, formAction] = useFormState(
    type === "create" ? createNewStudent : updateNewStudent,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data: any) => {
    console.log(data);
    formAction({ ...data, img: img?.secure_url, imgKartuKeluarga: imgKartuKeluarga?.secure_url, imgAktaKelahiran: imgAktaKelahiran?.secure_url });
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Siswa Baru ${type === "create" ? "dibuat " : "diperbaharui"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { grades, classes } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new student" : "Update the student"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <CldUploadWidget
          uploadPreset="school"
          onSuccess={(result, { widget }) => {
            setImg(result.info);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div
                className="text-xs text-black flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => open()}
              >
                <Image src="/upload.png" alt="" width={68} height={68} />
                <span>Upload Photo Murid</span>
              </div>
            );
          }}
        </CldUploadWidget>
        <CldUploadWidget
          uploadPreset="kartukeluarga"
          onSuccess={(result, { widget }) => {
            setImgKartuKeluarga(result.info);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div
                className="text-xs text-black flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => open()}
              >
                <Image src="/upload.png" alt="" width={68} height={68} />
                <span>Upload KK</span>
              </div>
            );
          }}
        </CldUploadWidget>
        <CldUploadWidget
          uploadPreset="aktakelahiran"
          onSuccess={(result, { widget }) => {
            setImgAktaKelahiran(result.info);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div
                className="text-xs text-black flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => open()}
              >
                <Image src="/upload.png" alt="" width={68} height={68} />
                <span>Upload Akta Kelahiran</span>
              </div>
            );
          }}
        </CldUploadWidget>
      </div>


      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Last Name"
          name="surname"
          defaultValue={data?.surname}
          register={register}
          error={errors.surname}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Golongan Darah</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("bloodType")}
            defaultValue={data?.bloodType}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
            <option value="Unknown">Tidak Diketahui</option>            
          </select>
          {errors.bloodType?.message && (
            <p className="text-xs text-red-400">
              {errors.bloodType.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Birthday"
          name="birthday"
          defaultValue={data?.birthday.toISOString().split("T")[0]}
          register={register}
          error={errors.birthday}
          type="date"
        />
        {/* <InputField
          label="Parent Id"
          name="parentId"
          defaultValue={data?.parentId}
          register={register}
          error={errors.parentId}
        /> */}
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
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="MALE">Laki Laki</option>
            <option value="FEMALE">Perempuan</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade</label>
          <input type="hidden" {...register("gradeId")} value={1} />
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            disabled
          >
            <option value={1}>1</option>
          </select>
          {errors.gradeId?.message && (
            <p className="text-xs text-red-400">
              {errors.gradeId.message.toString()}
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
            {classes
              .filter((classItem: any) => classItem.name === "PPDB")
              .map((classItem: any) => (
                <option value={classItem.id} key={classItem.id}>
                  ({classItem.name} - {" "}
                  {classItem._count.students + "/" + classItem.capacity}{" "}
                  Kapasitas)
                </option>
              ))}
          </select>
          {errors.classId?.message && (
            <p className="text-xs text-red-400">
              {errors.classId.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}

      <div>
        <span className="bg-yellow-50 text-sm font-bold">Perhatian :</span>
        <p className="text-xs text-black">
          <ol className="list-decimal list-inside">
            <li>Pastikan semua data telah terisi dengan benar</li>
            <li>
              Gambar yang diunggah harus berformat JPEG, PNG, atau JPG
            </li>
            <li>
              Ketika mengedit data harus <span className="font-bold bg-red-300">mengupload ulang semua Gambar</span>, untuk menghemat penyimpanan
            </li>
            </ol>
        </p>
      </div>
      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default PPDBForm;