import { create } from "zustand"

interface ChatStoreProps {
    isOpen: boolean
    isSetting: boolean
    toggleChat: () => void
    setOpen: (val: boolean) => void
    setSetting: (val: boolean) => void
}

const useChatStore = create<ChatStoreProps>((set) => ({
    isOpen: false,
    isSetting: false,
    toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
    setOpen: (val: boolean) => set({ isOpen: val }),
    setSetting: (val: boolean) => set({ isSetting: val })
}))

export default useChatStore
