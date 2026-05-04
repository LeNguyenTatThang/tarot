import { useSession, signOut } from "next-auth/react"
import { FiMinimize2 as CloseIcon, FiMaximize as FullIcon, FiMinimize as SmallIcon, FiSquare as MediumIcon } from "react-icons/fi"
import { HiOutlineLogout as SignOutIcon } from "react-icons/hi"
import { PiChatTeardropDotsBold as ChatRoomIcon } from "react-icons/pi"
import { AiOutlineRobot as BotIcon } from "react-icons/ai"
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5"
import Tooltip from "@/modules/elements/Tooltip"
import useChatStore from "@/common/stores/chat"
import { useTranslations } from "next-intl"

const ChatWidgetHeader = () => {
    const { toggleChat, activeTab, setActiveTab, size, setSize } = useChatStore()
    const { data: session } = useSession()
    const t = useTranslations("ChatRoomPage.widget")

    const tabs = [
        { id: "bot", label: t("tab_bot"), icon: BotIcon },
        { id: "room", label: t("tab_room"), icon: ChatRoomIcon },
        { id: "settings", label: t("tab_settings"), icon: SettingsIcon }
    ] as const

    return (
        <div className="flex flex-col border-b dark:border-neutral-600">
            <div className="flex items-center justify-between p-3 px-4 bg-neutral-100/50 dark:bg-neutral-800/50">
                <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    {activeTab === "bot" ? t("tab_bot") : activeTab === "room" ? t("tab_room") : t("tab_settings")}
                </p>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 mr-2 border-r pr-2 border-neutral-300 dark:border-neutral-700">
                        <Tooltip title="Small" position="bottom">
                            <SmallIcon
                                onClick={() => setSize("small")}
                                className={`cursor-pointer p-1 rounded transition-colors ${size === "small" ? "bg-primary-500 text-white" : "hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:text-neutral-300"}`}
                                size={22}
                            />
                        </Tooltip>
                        <Tooltip title="Medium" position="bottom">
                            <MediumIcon
                                onClick={() => setSize("medium")}
                                className={`cursor-pointer p-1 rounded transition-colors ${size === "medium" ? "bg-primary-500 text-white" : "hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:text-neutral-300"}`}
                                size={22}
                            />
                        </Tooltip>
                        <Tooltip title="Full" position="bottom">
                            <FullIcon
                                onClick={() => setSize("full")}
                                className={`cursor-pointer p-1 rounded transition-colors ${size === "full" ? "bg-primary-500 text-white" : "hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:text-neutral-300"}`}
                                size={22}
                            />
                        </Tooltip>
                    </div>
                    <Tooltip title={t("tooltip_minimize")} position="bottom">
                        <CloseIcon
                            onClick={toggleChat}
                            size={24}
                            className="cursor-pointer rounded-md bg-neutral-200/50 p-1 transition duration-300 hover:scale-105 hover:bg-neutral-300 active:scale-95 dark:bg-neutral-700/50 dark:text-neutral-100 dark:hover:bg-neutral-600"
                        />
                    </Tooltip>
                    {session && activeTab !== "settings" && (
                        <Tooltip title={t("tooltip_signout")} position="bottom">
                            <SignOutIcon
                                onClick={() => signOut()}
                                size={24}
                                className="cursor-pointer rounded-md bg-red-500/80 p-1 text-neutral-50 transition duration-300 hover:scale-105 hover:bg-red-500 active:scale-95"
                            />
                        </Tooltip>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-around p-1 px-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                        <div
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-1 flex-col items-center justify-center py-2 gap-1 cursor-pointer transition-all duration-300 rounded-lg ${
                                isActive 
                                    ? "text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-900/20" 
                                    : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            }`}
                        >
                            <Icon size={20} className={isActive ? "scale-110" : ""} />
                            <span className={`text-[10px] font-medium ${isActive ? "opacity-100" : "opacity-70"}`}>
                                {tab.label}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChatWidgetHeader

