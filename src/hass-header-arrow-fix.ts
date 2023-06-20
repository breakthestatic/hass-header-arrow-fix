import {shadowQuery} from './utils'

interface Tabs extends HTMLElement {
  _onTabSizingChanged: () => void
}

const panelResolver = shadowQuery(
  'home-assistant >>> home-assistant-main >>> partial-panel-resolver'
)
const tabs = shadowQuery(
  'home-assistant >>> home-assistant-main >>> ha-panel-lovelace >>> hui-root >>> ha-tabs'
) as Tabs

// Fire immediately
tabs?._onTabSizingChanged()

if (panelResolver) {
  // Also watch for changes to partial-panel-resolver to trigger on page updates
  new MutationObserver(() => {
    setTimeout(
      () =>
        (
          shadowQuery(
            'home-assistant >>> home-assistant-main >>> ha-panel-lovelace >>> hui-root >>> ha-tabs'
          ) as Tabs
        )?._onTabSizingChanged(),
      100
    )
  }).observe(panelResolver, {childList: true})
}
