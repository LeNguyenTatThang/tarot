"use client"

import useSWR from "swr"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import ChatAuth from "./ChatAuth"
import ChatInput from "./ChatInput"
import ChatList from "./ChatList"
import ChatItemSkeleton from "./ChatItemSkeleton"
import { MessageProps } from "@/common/types/chat"
import { fetcher } from "@/services/fetcher"
import { createClient } from "@/common/utils/client"
import useNotif from "@/hooks/useNotif"
import { useTranslations } from "next-intl"

export const ChatRoom = ({ isWidget = false }: { isWidget?: boolean }) => {
    const t = useTranslations("ChatRoomPage.widget.notif")
    const { data, isLoading } = useSWR("/api/chat", fetcher)
    const [messages, setMessages] = useState<MessageProps[]>([])
    const mergedMessages = data ?? messages
    const [isReply, setIsReply] = useState({ is_reply: false, name: "" })

    const { data: session } = useSession()

    const supabase = createClient()

    const notif = useNotif()

    const handleClickReply = (name: string) => {
        if (!session?.user) return notif(t("signin_required"))
        setIsReply({ is_reply: true, name })
    }

    const handleCancelReply = () => {
        setIsReply({ is_reply: false, name: "" })
    }

    const handleSendMessage = async (message: string) => {
        const messageId = uuidv4();
        const newMessageData = {
            id: messageId,
            name: session?.user?.name,
            email: session?.user?.email,
            image: session?.user?.image,
            message,
            is_reply: isReply.is_reply,
            reply_to: isReply.name,
            is_show: true,
            created_at: new Date().toISOString()
        }
        try {
            await axios.post("/api/chat", newMessageData)
            notif(t("send_success"))
        } catch (error) {
            console.error("Error:", error)
            notif(t("send_failed"))
        }
    }

    const handleDeleteMessage = async (id: string) => {
        try {
            await axios.delete(`/api/chat/${id}`)
            notif(t("delete_success"))
        } catch (error) {
            notif(t("delete_failed"))
        }
    }

    useEffect(() => {
        const channel = supabase
            .channel("realtime chat")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "messages"
                },
                (payload) => {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        payload.new as MessageProps
                    ])
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "DELETE",
                    schema: "public",
                    table: "messages"
                },
                (payload) => {
                    setMessages((prevMessages) =>
                        prevMessages.filter((msg) => msg.id !== payload.old.id)
                    )
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        };
    }, [supabase])

    return (
        <>
            {isLoading ? (
                <ChatItemSkeleton />
            ) : (
                <ChatList
                    messages={mergedMessages}
                    onDeleteMessage={handleDeleteMessage}
                    onClickReply={handleClickReply}
                    isWidget={isWidget}
                />
            )}
            {session ? (
                <ChatInput
                    onSendMessage={handleSendMessage}
                    onCancelReply={handleCancelReply}
                    replyName={isReply.name}
                    isWidget={isWidget}
                />
            ) : (
                <ChatAuth isWidget={isWidget} />
            )}
        </>
    )
}
