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

const validators = {
  validateDate,
  validateAnimalCount,
  validateTime
}

export { validators }
