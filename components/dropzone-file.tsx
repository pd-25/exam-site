"use client"

import React, { useCallback } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

import { useSupabase } from "@/app/supabase_provider"

const DropzoneFiles = () => {
  const { supabase } = useSupabase()

  async function uploadFile(file) {
    const { data, error } = await supabase.storage
      .from("banners")
      .upload(file.path, file)

    if (error) {
      console.log(error)
      // Handle error
      toast.error(error.message)
    } else {
      // Handle success
      await supabase.from("banners").insert([{ url: data.path }])
      toast.success("File uploaded successfully")
    }
  }
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      await uploadFile(file)
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
        "image/gif": [".gif"],
        "image/svg+xml": [".svg"],
      },
      maxFiles: 4,
      onDrop,
    })

  const files = acceptedFiles.map((file: any) => (
    <div key={file.path} className="relative aspect-video">
      <Image
        src={URL.createObjectURL(file)}
        alt={file.path}
        fill
        className="rounded-lg object-cover"
      />
    </div>
  ))

  return (
    <div>
      <div
        {...getRootProps()}
        className="rounded-lg border-2 border-dashed p-10"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop some files here, or click to select files</p>
        )}
      </div>
      <aside className="py-4">
        <ul className="grid grid-cols-3 gap-2">{files}</ul>
      </aside>
    </div>
  )
}

export default DropzoneFiles
