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
    }
}))

export default useStore