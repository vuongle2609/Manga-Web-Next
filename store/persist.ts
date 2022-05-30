import create from "zustand"
import { persist } from "zustand/middleware"

const useLocalStorage = create(persist(
    (set: any, get: any) => ({
        token: {
            refresh: null,
            session: null
        },
        addToken: ({ refresh, session }) => set({
            token: {
                refresh,
                session
            }
        })
    }),
    {
        name: "access-token",
        getStorage: () => localStorage,
    }
))

export default useLocalStorage