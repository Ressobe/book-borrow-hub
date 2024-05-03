import { TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Message } from "@prisma/client";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";

function timestampToHour(timestamp: Date) {
  let date = new Date(timestamp);
  let hours: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();
  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  return hours + ":" + minutes;
}

type MessageBoxProps = {
  message: Message;
  isOwn: boolean;
};

export function MessageBox({ message, isOwn }: MessageBoxProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <div
          className={cn(
            "w-full flex",
            isOwn ? "flex-row-reverse text-right" : "flex-row text-left",
          )}
        >
          <TooltipTrigger asChild>
            <p className="bg-secondary p-2 rounded-xl">{message.content}</p>
          </TooltipTrigger>
        </div>
        <TooltipContent>
          <p>{timestampToHour(message.timestamp)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
