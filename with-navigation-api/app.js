import { getPageContent, renderPageContent, onNavigate } from './utils'

onNavigate(async ({ fromURL, toURL, isBack }) => {
  const app = document.getElementById('app')
  const content = await getPageContent(toURL)

  if (fromURL === toURL.pathname) {
    return
  }

  document.documentElement.setAttribute('data-bt', isBack)

  if (!document.startViewTransition) {
    renderPageContent(app, content)
    return
  }

  document.startViewTransition(() => {
    renderPageContent(app, content)
  })
})
