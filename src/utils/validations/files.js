export const filesValidation = (files, validationData) => {
  let error
  if (files.some((file) => file.size > validationData.maxFileSize)) {
    error = validationData.fileSizeError
  }
  if (
    files.reduce((acc, file) => acc + file.size, 0) >
    validationData.maxAllFilesSize
  ) {
    error = validationData.allFilesSizeError
  }
  if (
    files.length > 0 &&
    validationData.fileTypes &&
    !files.every((file) =>
      validationData.fileTypes.some((type) => file.type === type)
    )
  ) {
    error = validationData.typeError
  }

  return error
}
