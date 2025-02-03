import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Typography } from '@mui/material'

import { snackbarVariants } from '~/constants'
import { validationData } from './constants'
import { useSnackBarContext } from '~/context/snackbar-context'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import FileUploader from '~/components/file-uploader/FileUploader'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
  const [uploadedFile, setUploadedFile] = useState(null)

  const handleFileUpload = ({ files, error }) => {
    if (!error && files.length > 0) {
      setUploadedFile(URL.createObjectURL(files[0]))
    } else {
      setAlert({
        severity: snackbarVariants.error,
        message: `${error}`
      })
    }
  }

  return (
    <Box sx={style.root}>
      <DragAndDrop
        emitter={handleFileUpload}
        style={{
          root: style.root,
          uploadBox: style.uploadBox,
          activeDrag: style.activeDrag
        }}
        validationData={validationData}
      >
        {uploadedFile ? (
          <Box sx={style.imgContainer}>
            <Box
              alt={t('becomeTutor.photo.imageAlt')}
              component='img'
              src={uploadedFile}
              style={style.img}
            />
          </Box>
        ) : (
          <Typography>{t('becomeTutor.photo.placeholder')}</Typography>
        )}
      </DragAndDrop>
      <Box sx={style.rigthBox}>
        <Box>
          <Typography sx={style.description}>
            {t('becomeTutor.photo.description')}
          </Typography>
          <Box>
            <FileUploader
              buttonText={t('becomeTutor.photo.button')}
              emitter={handleFileUpload}
              isImages
              sx={{
                root: style.fileUploader.root,
                button: style.fileUploader.button
              }}
              validationData={validationData}
            />
          </Box>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
