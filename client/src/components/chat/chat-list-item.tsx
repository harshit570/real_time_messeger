import { useAuth } from "@/hooks/use-auth";
import { formatChatTime, getOtherUserAndGroup } from "@/lib/helper";
import { cn } from "@/lib/utils";
import type { ChatType } from "@/types/chat.type";
import { useLocation } from "react-router-dom";
import AvatarWithBadge from "../avatar-with-badge";

interface PropsType{
  chat:ChatType;
  onClick?:()=>void
}
const ChatListItem = ({chat,onClick}:PropsType) => {
  const {pathname}=useLocation();

  const {lastMessage,createdAt}=chat;
  const {user}=useAuth();
  const currentUserId=user?._id||null;

  const {name,avatar,isOnline,isGroup}=getOtherUserAndGroup(chat,currentUserId);
  return (
    <button
    onClick={onClick}
    className={
      cn(
        `w-full flex items-center gap-2 p-2 rounded-sm hover:bg-sidebar-accent transition-colors text-left`,
        pathname.includes(chat._id) && "!bg-sidebar-accent"
      )
    }
    >
      <AvatarWithBadge name={name} src={avatar} isGroup={isGroup} isOnline={isOnline}/>
      <div className="flex-1 min-w-0">
       <div className="flex items-center justify-between mb-0.5">
        <h5 className="text-sm font-semibold truncate">{name}</h5>
        <span className="text-xs ml-2 shrink-0 text-muted-foreground">{formatChatTime(lastMessage?.updatedAt || createdAt)}</span>
       </div>
      </div>

    </button>
  )
}

export default ChatListItem