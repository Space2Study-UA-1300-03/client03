import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Typography } from '@mui/material'

import { snackbarVariants } from '~/constants'
import { validationData } from './constants'
import { useSnackBarContext } from '~/context/snackbar-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import { imageResize } from '~/utils/image-resize'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import FileUploader from '~/components/file-uploader/FileUploader'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [uploadedPhoto, setUploadedPhoto] = useState(null)
  const { isLaptopAndAbove, isTablet, isMobile } = useBreakpoints()
  const { setAlert } = useSnackBarContext()

  const resizePhoto = async (photo) => {
    const originalPhoto = URL.createObjectURL(photo)
    const photoSize = { newWidth: 440, newHeight: 440 }
    const resizedPhoto = await imageResize(originalPhoto, photoSize)

    setUploadedPhoto(resizedPhoto)
    URL.revokeObjectURL(originalPhoto)
  }

  const handlePhotoUpload = async ({ files, error }) => {
    if (!error && files.length > 0) {
      await resizePhoto(files[0])
    } else {
      setAlert({
        severity: snackbarVariants.error,
        message: `${error}`
      })
    }
  }

  const dragAndDrop = (
    <DragAndDrop
      emitter={handlePhotoUpload}
      style={{
        root: style.imgContainer,
        uploadBox: style.uploadBox,
        activeDrag: style.activeDrag
      }}
      validationData={validationData}
    >
      {uploadedPhoto ? (
        <Box
          alt={t('becomeTutor.photo.imageAlt')}
          component='img'
          src={uploadedPhoto}
          style={style.img}
        />
      ) : (
        <Typography>{t('becomeTutor.photo.placeholder')}</Typography>
      )}
    </DragAndDrop>
  )

  return (
    <Box sx={style.root}>
      {isLaptopAndAbove && dragAndDrop}
      <Box sx={style.rigthBox}>
        <Box>
          <Typography sx={style.description}>
            {t('becomeTutor.photo.description')}
          </Typography>
          <FileUploader
            buttonText={t('becomeTutor.photo.button')}
            emitter={handlePhotoUpload}
            isImages
            sx={style.fileUploader}
            validationData={validationData}
          />
        </Box>
        {(isMobile || isTablet) && dragAndDrop}
        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
