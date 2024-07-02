import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ProfileStore {
  token: string | null
  setToken: (token: string | null) => void
}

export const useTokenStore = create<ProfileStore>()(
  persist(
    (set) => ({
        token: null,
        setToken: (token) =>
        set(() => ({
            token,
        })),
    }),
    {
      name: "token-store",
    }
  )
)