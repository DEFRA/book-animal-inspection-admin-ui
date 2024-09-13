export const siteOperationsController = {
  handler(request, h) {
    return h.view('siteOperations/index', {
      pageTitle: 'Site Operations',
      heading: 'SiteOperations'
    })
  }
}
