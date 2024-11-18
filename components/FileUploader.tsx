"use client";
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploaderProps = {
    files: File[] | undefined;
    onChange: (files: File[]) => void;
    }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FileUploader = ({ files, onChange} : FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles : File[]) => {
    onChange(acceptedFiles)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          // eslint-disable-next-line react/no-unescaped-entities
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUploader;