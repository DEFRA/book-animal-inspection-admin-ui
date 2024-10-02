const errorMessages = {
  siteSelectionRequired: 'Select a border control post',
  vehicleSelectionRequired: 'Select a vehicle type',
  vehicleUnloadSelectionRequired: 'Select a vehicle unload type',
  animalNameSelectionRequired: 'Enter an animal species',
  dateDayRequired: 'The Date must include a day',
  dateMonthRequired: 'The Date must include a month',
  dateYearRequired: 'The date must include a year',
  dateNumbersOnly: 'Date of arrival can only contain numbers.',
  dateInFutureOnly: 'Date of arrival must be a future date',
  dateInvalid: 'Invalid date value',
  animalCountNumberOnly: 'Species count can only contain numbers.',
  animalCountRequired: 'Enter a number',
  inspectionDateRequired: 'Choose inspection date',
  inspectionTimeRequired: 'Choose inspection Time',
  declarationOptionRequired: 'Choose declaration option',
  timeFromRequired: 'Start time is required',
  timeToRequired: 'End time is required',
  timeInvalidFormat: "Invalid time format. Please use the format 'h:mm(am/pm)'",
  timeOrderInvalid: 'Start time must be earlier than end time',
  inspectionLengthAnimalSelectionRequired:
    'You must select at least one animal type',
  inspectionLengthTimeRequired:
    'All time fields are required and must be positive integers greater than zero.'
}

export { errorMessages }
