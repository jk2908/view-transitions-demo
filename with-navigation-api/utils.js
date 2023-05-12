// https://glitch.com/edit/#!/simple-set-demos?path=directional-transition%2Findex.html%3A1%3A0

export async function getPageContent(url) {
  const res = await fetch(url)
  const text = await res.text()

  const regex = /<div id="app">([\s\S]*?)<\/div>/i
  const match = text.match(regex)

  return match[1]
}

export function renderPageContent(root, content) {
  root.innerHTML = content
}

function isBackNavigation(navigateEvent) {
  if (navigateEvent.navigationType === 'push' || navigateEvent.navigationType === 'replace') {
    return false
  }

  if (navigateEvent.destination.index !== -1 && navigateEvent.destination.index < navigation.currentEntry.index) {
    return true
  }

  return false
}

export async function onNavigate(callback) {
  navigation.addEventListener('navigate', e => {
    const fromURL = location.pathname
    const toURL = new URL(e.destination.url)
    const isBack = isBackNavigation(e)

    e.intercept({
      async handler() {
        callback({
          fromURL,
          toURL,
          isBack,
        })
      },
    })
  })
}
