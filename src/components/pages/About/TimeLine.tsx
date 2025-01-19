import React from "react";

interface TimelineItemProps {
  children?: React.ReactNode;
  number?: number;
  index: number;
  date: string;
  title: string;
  description: string;
  link?: string;
}
import { motion } from "motion/react";
function Timeline({ children }: { children: React.ReactNode }) {
  // Convert children to array to access index
  const childrenArray = React.Children.toArray(children);

  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      {React.Children.map(childrenArray, (child, index) => {
        if (React.isValidElement<TimelineItemProps>(child)) {
          return React.cloneElement(child, { number: index + 1 });
        }
        return child;
      })}
    </ol>
  );
}

export function TimelineItem({
  date,
  title,
  index,
  description,
  link,
}: TimelineItemProps) {
  return (
    <li className="mb-10 ml-4">
      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
      <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {date}
      </time>
      <motion.h3
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.2, type: "spring" }}
        className="text-lg font-semibold text-gray-900 dark:text-white"
      >
        {title}
      </motion.h3>
      <motion.p
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
      >
        {description}
      </motion.p>
      {link && (
        <a
          href={link}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          Learn more
          <svg
            className="w-3 h-3 ml-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      )}
    </li>
  );
}

export function TimelinePoint() {
  return (
    <div className="relative -left-[1.35rem]">
      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
    </div>
  );
}

export function TimelineContent({ children }: { children: React.ReactNode }) {
  return <div className="flex-1">{children}</div>;
}

export default Timeline;
