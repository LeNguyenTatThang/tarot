import SkeletonLoader from "@/modules/elements/SkeletonLoader"
import Skeleton from "react-loading-skeleton"

const ChatItemSkeleton = () => {
    return (
        <SkeletonLoader>
            <div className="flex gap-4">
                <Skeleton circle containerClassName="w-[60px]" />
                <div className="w-full">
                <div className="flex w-1/2 gap-4">
                    <Skeleton containerClassName="w-full" />
                    <Skeleton containerClassName="w-full" />
                </div>
                <Skeleton count={2} />
                </div>
            </div>
        </SkeletonLoader>
    )
}

export default ChatItemSkeleton
