export const shedOpeningTimingController = {
  handler(request, h) {
    return h.view('shedOpeningTiming/index', {
      pageTitle: 'Shed Opening Timing',
      heading: 'SehdOpeningTiming'
    })
  }
}
