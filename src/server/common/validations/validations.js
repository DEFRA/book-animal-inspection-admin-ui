import { errorMessages } from '~/src/server/common/validations/errorMessages.js'

const validateDate = (day, month, year) => {
  if (!day) {
    return errorMessages.dateDayRequired
  }
  if (!month) {
    return errorMessages.dateMonthRequired
  }
  if (!year) {
    return errorMessages.dateYearRequired
  }

  const DateDay = parseInt(day, 10)
  const DateMonth = parseInt(month, 10)
  const DateYear = parseInt(year, 10)

  if (isNaN(DateDay) || isNaN(DateMonth) || isNaN(DateYear)) {
    return errorMessages.dateNumbersOnly
  } else if (
    DateDay < 1 ||
    DateDay > 31 ||
    DateMonth < 1 ||
    DateMonth > 12 ||
    DateYear < 1900 ||
    DateYear > 2100
  ) {
    return errorMessages.dateInvalid
  }

  const inputDate = new Date(DateYear, DateMonth - 1, DateDay)
  const currentDate = new Date()
  if (inputDate <= currentDate) {
    return errorMessages.dateInFutureOnly
  }

  return null
}

const validateAnimalCount = (animalCount) => {
  if (!animalCount || animalCount.trim() === '') {
    return errorMessages.animalCountRequired
  }

  if (isNaN(animalCount)) {
    return errorMessages.animalCountNumberOnly
  }
  return null
}

const validateTime = (from, to) => {
  // Check if 'from' time is provided
  if (!from) {
    return errorMessages.timeFromRequired
  }

  // Check if 'to' time is provided
  if (!to) {
    return errorMessages.timeToRequired
  }

  // Validate format of 'from' and 'to' times
  const fromTime = parseTimeString(from)?.split(':')
  const toTime = parseTimeString(to)?.split(':')

  const fromTimeHours = fromTime ? parseInt(fromTime[0], 10) : null
  const fromTimeMinutes = fromTime ? parseInt(fromTime[1], 10) : null
  const toTimeHours = toTime ? parseInt(toTime[0], 10) : null
  const toTimeMinutes = toTime ? parseInt(toTime[1], 10) : null

  if (!fromTime || !toTime) {
    return errorMessages.timeInvalidFormat
  }

  if (
    fromTimeHours != null &&
    toTimeHours != null &&
    fromTimeMinutes != null &&
    toTimeMinutes != null
  ) {
    if (
      fromTimeHours > toTimeHours ||
      (fromTimeHours === toTimeHours && fromTimeMinutes > toTimeMinutes)
    ) {
      return errorMessages.timeOrderInvalid
    }
  }

  return null
}

const timeRegex = /^(1[0-2]|0?[1-9]):?([0-5][0-9])?\s?(am|pm)$/i

const parseTimeString = (timeStr) => {
  const match = timeStr.toLowerCase().match(timeRegex)
  if (!match) return null

  let [, hours, minutes, period] = match
  minutes = minutes || '00' // default to 00 if no minutes provided

  // Convert to 24-hour format for easy comparison
  if (period === 'pm' && hours !== '12') {
    hours = parseInt(hours, 10) + 12
  } else if (period === 'am' && hours === '12') {
    hours = '00'
  }

  return `${hours}:${minutes}`
}

const validateAnimalSelection = (selectedAnimals) => {
  // Check if the user selected at least one checkbox
  if (!selectedAnimals || selectedAnimals.length === 0) {
    return errorMessages.inspectionLengthAnimalSelectionRequired
  }

  return null
}

const validateInspectionLength = (marshalling, setup, inspection, cleanUp) => {
  // Map the fields to their respective names for better error messages
  const fields = {
    Marshalling: marshalling,
    Setup: setup,
    Inspection: inspection,
    CleanUp: cleanUp
  }

  // Helper function to validate each field
  const validateMinutes = (fields) => {
    const errorMessages = []

    // Iterate over each field and perform the validation
    for (const [name, value] of Object.entries(fields)) {
      // Check if the field is empty or undefined
      if (value === undefined || value === null || value === '') {
        errorMessages.push(`${name} is required and cannot be empty`)
      }

      // Check if the value is a valid integer and non-negative
      if (!Number.isInteger(Number(value)) || Number(value) < 0) {
        errorMessages.push(`${name} must be a valid non-negative integer value`)
      }
    }

    // If there are any error messages, return them joined by a new line
    return errorMessages.length > 0 ? errorMessages.join('\n') : null
  }

  // Perform validation on the provided fields
  return validateMinutes(fields)
}

const validators = {
  validateDate,
  validateAnimalCount,
  validateTime,
  validateAnimalSelection,
  validateInspectionLength
}

export { validators }
