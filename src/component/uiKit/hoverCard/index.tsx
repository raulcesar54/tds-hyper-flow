import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

interface HoverCardProps {
  children: JSX.Element;
  title: string;
}

export const HoverCard = (props: HoverCardProps) => {
  return (
    <HoverCardPrimitive.Root closeDelay={0} openDelay={0}>
      <HoverCardPrimitive.Trigger asChild>
        {props.children}
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Content
        sideOffset={16}
        align="start"
        side="left"
        className={"p-4 bg-white border-2 border-slate-100 "}
      >
        <HoverCardPrimitive.Arrow className="fill-current text-slate-100" />

        <div className="flex h-full w-full space-x-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 ">
              {props.title}
            </h3>

            <p className="mt-1 text-sm font-normal text-gray-700 dark:text-gray-400">
              Arraste e solte no board
            </p>
          </div>
        </div>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};
