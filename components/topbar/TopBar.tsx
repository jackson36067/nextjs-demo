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
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

interface TopBarMenu {
  title: string;
  hoverMenuItems: string[];
}

// 判断页面宽度是否到达临界点
const useBreakpoint = (breakpoint: number) => {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsBelowBreakpoint(window.innerWidth <= breakpoint);
    };

    handleResize(); // 组件挂载时执行一次
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isBelowBreakpoint;
};

// 顶部栏内容
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

// 宽度足够的顶部栏右部分内容
const FullWidthComponent = () =>
  topbarMenu.map((item, index) => {
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
  });

// 宽度不足时顶部栏右侧内容
const LoseWidthComponent = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <div className="cursor-pointer">
        <Icon icon="lucide:menu" className="w-8 h-8" />
      </div>
      {/* <Button variant="outline">Open</Button> */}
    </DropdownMenuTrigger>
    <DropdownMenuContent
      asChild
      align="start"
      className={cn("bg-[#191e1e] overflow-hidden p-2")}
      sideOffset={0}
      side="bottom"
    >
      <motion.div
        initial={{ opacity: 0, y: "-100vh" }} // 从屏幕最顶端 (-100vh) 开始
        animate={{ opacity: 1, y: 0 }} // 掉落到正常位置
        exit={{ opacity: 0, y: "-100vh" }} // 关闭时返回顶部
        transition={{ duration: 0.5, ease: "easeOut" }} // 平滑过渡
        className="w-screen h-screen bg-[#191e1e] text-white flex flex-col items-start justify-start p-8 z-[9999]"
      >
        <Accordion type="single" collapsible className="w-full">
          {topbarMenu.map((item, index) => {
            return (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="mt-10 w-full hover:text-[#6db33f]"
              >
                <AccordionTrigger className="flex flex-col items-start w-full pb-4 text-3xl border-b-[1px] border-b-white">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col text-[#98afae] text-xl">
                  {item.hoverMenuItems.map((item, index) => {
                    return (
                      <a
                        href="#"
                        key={index}
                        className="hover:text-[#6db33f] mt-3"
                      >
                        {item}
                      </a>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </motion.div>
    </DropdownMenuContent>
  </DropdownMenu>
);
const TopBar = () => {
  const { setTheme } = useTheme();
  const isFullWidth = useBreakpoint(1000); // 768px 作为临界值
  return (
    <div className="w-full h-10 md:h-10 lg:h-16 box-border bg-white text-black dark:bg-[#1b1f23] dark:text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-full flex justify-between items-center">
        <div>
          <Icon icon="devicon:spring" className="w-8 h-8" />
        </div>
        <div className="flex items-center">
          {!isFullWidth ? <FullWidthComponent /> : <LoseWidthComponent />}
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
