import { create } from "zustand"

export interface BotMessage {
    id: string
    role: "bot" | "user" | "result"
    content: string
}

interface ChatStoreProps {
    isOpen: boolean
    isSetting: boolean
    activeTab: "bot" | "room" | "settings"
    size: "small" | "medium" | "full"
    messages: BotMessage[]
    toggleChat: () => void
    setOpen: (val: boolean) => void
    setSetting: (val: boolean) => void
    setActiveTab: (tab: "bot" | "room" | "settings") => void
    setSize: (size: "small" | "medium" | "full") => void
    setMessages: (messages: BotMessage[] | ((prev: BotMessage[]) => BotMessage[])) => void
}

const useChatStore = create<ChatStoreProps>((set) => ({
    isOpen: false,
    isSetting: false,
    activeTab: "room",
    size: "small",
    messages: [
        {
            id: "1",
            role: "bot",
            content: "Xin chào! Tôi là trợ lý AI Tarot. Bạn hãy nhập câu hỏi mà bạn muốn xem hôm nay vào đây nhé."
        }
    ],
    toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
    setOpen: (val: boolean) => set({ isOpen: val }),
    setSetting: (val: boolean) => set({ isSetting: val }),
    setActiveTab: (tab) => set({ activeTab: tab }),
    setSize: (size) => set({ size }),
    setMessages: (messages) => set((state) => ({ 
        messages: typeof messages === "function" ? messages(state.messages) : messages 
    }))
}))

export default useChatStore
