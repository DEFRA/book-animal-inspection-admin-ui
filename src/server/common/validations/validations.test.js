import { validators } from '~/src/server/common/validations/validations.js'
import { errorMessages } from '~/src/server/common/validations/errorMessages.js'

describe('validators', () => {
  describe('validateDate', () => {
    it('should return error if day is missing', () => {
      const result = validators.validateDate(null, '5', '2023')
      expect(result).toBe(errorMessages.dateDayRequired)
    })

    it('should return error if month is missing', () => {
      const result = validators.validateDate('10', null, '2023')
      expect(result).toBe(errorMessages.dateMonthRequired)
    })

    it('should return error if year is missing', () => {
      const result = validators.validateDate('10', '5', null)
      expect(result).toBe(errorMessages.dateYearRequired)
    })

    it('should return error if any of the values are not numbers', () => {
      const result = validators.validateDate('abc', '5', '2023')
      expect(result).toBe(errorMessages.dateNumbersOnly)
    })

    it('should return error if the date is invalid (like day > 31)', () => {
      const result = validators.validateDate('32', '5', '2023')
      expect(result).toBe(errorMessages.dateInvalid)
    })

    it('should return error if the month is invalid (like month > 12)', () => {
      const result = validators.validateDate('10', '13', '2023')
      expect(result).toBe(errorMessages.dateInvalid)
    })

    it('should return error if the year is out of bounds (<1900 or >2100)', () => {
      const result = validators.validateDate('10', '5', '1899')
      expect(result).toBe(errorMessages.dateInvalid)
    })

    it('should return error if the date is in the past', () => {
      const pastDate = new Date().getFullYear() - 1
      const result = validators.validateDate('10', '5', pastDate.toString())
      expect(result).toBe(errorMessages.dateInFutureOnly)
    })

    it('should return null if the date is valid and in the future', () => {
      const futureYear = new Date().getFullYear() + 1
      const result = validators.validateDate('10', '5', futureYear.toString())
      expect(result).toBeNull()
    })
  })

  describe('validateAnimalCount', () => {
    it('should return error if animal count is missing', () => {
      const result = validators.validateAnimalCount(null)
      expect(result).toBe(errorMessages.animalCountRequired)
    })

    it('should return error if animal count is an empty string', () => {
      const result = validators.validateAnimalCount('')
      expect(result).toBe(errorMessages.animalCountRequired)
    })

    it('should return error if animal count is not a number', () => {
      const result = validators.validateAnimalCount('abc')
      expect(result).toBe(errorMessages.animalCountNumberOnly)
    })

    it('should return null if animal count is a valid number', () => {
      const result = validators.validateAnimalCount('10')
      expect(result).toBeNull()
    })
  })
})
