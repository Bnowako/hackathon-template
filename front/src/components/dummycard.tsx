import { GentleAgent } from "@/api/agentApi";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { JSX } from "react";
import { Button } from "./ui/button";

interface DummyCardProps {
    request: GentleAgent;
    children?: JSX.Element;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const DummyCard = ({ request, children, onClick }: DummyCardProps) => {
    const { id, name, time } = request;

    return (
        <figure onClick={onClick}
            className={cn(
                "relative mx-auto min-h-fit w-full overflow-hidden rounded-2xl p-4",
                // animation styles
                "transition-all duration-200 ease-in-out hover:shadow-md hover:border-gray-300 hover:border-2",
                // light styles
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles
                "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
            )}
        >

            <div  className="cursor-pointer flex flex-row items-center gap-3">
                <div
                    className="flex size-10 items-center justify-center rounded-2xl"
                >
                    <span className="text-lg">🚀</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
                        <span className="text-sm sm:text-lg">{name}</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{time}</span>
                    </figcaption>
                    {/* <p className="text-sm font-normal dark:text-white/60"> */}
                        {/* Job field: lala */}
                    {/* </p> */}
                </div>
                
            </div>
        </figure>
    );
};
