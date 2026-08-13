import { createContext, useContext } from 'react'

export interface MonkeyState {
  /** True once the toy has been dropped on Ginger. Never persisted. */
  hasMonkey: boolean
  deliverMonkey: () => void
}

/**
 * Connects the toy hidden down the page to Ginger in the nav rail, which
 * are too far apart in the tree to pass props between.
 */
export const MonkeyContext = createContext<MonkeyState>({
  hasMonkey: false,
  deliverMonkey: () => {},
})

export function useMonkey() {
  return useContext(MonkeyContext)
}
