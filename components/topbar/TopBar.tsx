"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import Icon from "@/components/icon/page";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
interface TopBarMenu {
  title: string;
  hoverMenuItems: string[];
}
const TopBar = () => {
  const topbarMenu: TopBarMenu[] = [
    {
      title: "Why Spring",
      hoverMenuItems: ["fjlasdf", "sdfjlkasjdlf"],
    },
    {
      title: "Learn",
      hoverMenuItems: ["fjlasdf", "sdfjlkasjdlf"],
    },
    { title: "Project", hoverMenuItems: ["fjlasdf", "sdfjlkasjdlf"] },
    { title: "Acadeny", hoverMenuItems: ["fjlasdf", "sdfjlkasjdlf"] },
    { title: "Solutions", hoverMenuItems: ["fjlasdf", "sdfjlkasjdlf"] },
    { title: "Community", hoverMenuItems: ["fjlasdf", "sdfjlkasjdlf"] },
  ];

  const { setTheme } = useTheme();
  return (
    <div className="w-full h-10 md:h-10 lg:h-16 box-border bg-white text-black dark:bg-[#1b1f23] dark:text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-full flex justify-between items-center">
        <div>
          <Icon icon="devicon:spring" className="w-8 h-8" />
        </div>
        <div className="flex items-center">
          {topbarMenu.map((item, index) => {
            return (
              <div key={index} className="relative">
                <HoverCard key={index}>
                  <HoverCardTrigger asChild>
                    <div
                      key={index}
                      className="relative text-base font-bold px-6 after:content-[''] after:absolute after:w-2 after:h-2 after:border-r-2 after:border-b-2 after:border-black dark:after:border-white after:rotate-45 after:top-2 after:right-2"
                    >
                      {item.title}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex flex-col w-88 absolute -left-10 mt-4 p-5 pr-12 shadow-md bg-white dark:bg-[#1b1f23] text-black dark:text-white border-none rounded-lg">
                    {item.hoverMenuItems.map((content, index) => {
                      return (
                        <a
                          href="#"
                          key={index}
                          className="mt-5 first:mt-0 hover:text-[#6db33f]"
                        >
                          {content}
                        </a>
                      );
                    })}
                  </HoverCardContent>
                </HoverCard>
              </div>
            );
          })}
          <div className="ml-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white dark:bg-[#1b1f23] text-black dark:text-white border-none"
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  {/* <span className="sr-only">Toggle theme</span> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white dark:bg-black text-balck dark:text-white"
              >
                <DropdownMenuItem
                  className="p-1 pr-8"
                  onClick={() => setTheme("light")}
                >
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="p-1 pr-8"
                  onClick={() => setTheme("dark")}
                >
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="p-1 pr-8"
                  onClick={() => setTheme("system")}
                >
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
