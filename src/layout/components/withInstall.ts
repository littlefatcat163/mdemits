import type { App, Plugin } from 'vue'

export default <T>(component: T): T & Plugin => {
  const Component = component as any & Plugin
  Component.install = (app: App) => {
    app.component(Component.name, Component)
    return app
  }
  return Component
}
