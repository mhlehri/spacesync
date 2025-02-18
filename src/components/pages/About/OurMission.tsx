import { CheckCircle, Globe, Phone, User } from "lucide-react";
import { motion } from "motion/react";

const missionData = {
  title: "Our Mission: Purpose and Goals",
  purpose:
    "To provide innovative solutions that enhance collaboration and foster productivity in co-working spaces, creating environments where individuals and businesses can thrive together.",
  goals: [
    {
      icon: <CheckCircle className="h-6 w-6 text-indigo-500" />,
      text: "Create a seamless booking experience for all users, ensuring easy access to shared resources and spaces.",
    },
    {
      icon: <User className="h-6 w-6 text-indigo-500" />,
      text: "Improve accessibility to shared resources and spaces, making them available to a diverse community of professionals.",
    },
    {
      icon: <Phone className="h-6 w-6 text-indigo-500" />,
      text: "Enable efficient space utilization and scheduling, optimizing the use of available resources.",
    },
    {
      icon: <Globe className="h-6 w-6 text-indigo-500" />,
      text: "Provide a platform that fosters a community-driven work environment, encouraging networking and collaboration.",
    },
  ],
};

export default function OurMission() {
  return (
    <section className="py-12">
      <div>
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4 md:mb-8">
          Our Mission: Purpose and Goals
        </h2>
      </div>
      <div>
        <p className="text-lg text-gray-700 text-center">
          To provide innovative solutions that enhance collaboration and foster
          productivity in co-working spaces.
        </p>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {missionData.goals.map((goal, index) => (
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className="text-lg bg-white text-gray-700 flex items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="mr-4 flex-shrink-0">{goal.icon}</span>
              <span>{goal.text}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
