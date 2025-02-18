import { motion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
      <div className="flex gap-6 flex-wrap">
        <div className="flex items-center space-x-2">
          <Mail className="text-indigo-500" />
          <span>contact@example.com</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="text-indigo-500" />
          <span>+1 (555) 123-4567</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="text-indigo-500" />
          <span>123 Business St, City, State 12345</span>
        </div>
      </div>
    </motion.div>
  );
}
