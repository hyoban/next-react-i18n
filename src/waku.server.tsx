import { contextStorage, getContext } from 'hono/context-storage'
import { fsRouter } from 'waku'
import adapter from 'waku/adapters/default'

const router = fsRouter(
  import.meta.glob('./**/*.{tsx,ts}', { base: './pages' }),
)

export const getRouterConfigs = () => router.unstable_getRouterConfigs()

export default adapter(router, {
  middlewareFns: [contextStorage],
  middlewareModules: import.meta.glob('./middleware/*.ts'),
})

export const getHonoContext = ((globalThis as Record<string, unknown>).__WAKU_GET_HONO_CONTEXT__
  ||= getContext)
