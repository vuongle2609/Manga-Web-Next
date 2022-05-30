import create from "zustand";

const useStore: any = create((set: any) => ({
    coverModal: false,
    setCoverModal: (image: string) => {
        set(() => ({
            coverModal: image
        }))
    },
    removeCoverModal: () => {
        set(() => ({
            coverModal: false
        }))
    },
    loginModal: false,
    setLoginModal: (open: boolean) => {
        set(() => ({
            loginModal: open
        }))
    },
    userData: null,
    setUserData: (data: any) => {
        set(() => ({
            userData: data
        }))
    }
}))

export default useStore