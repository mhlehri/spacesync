import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "motion/react";
export default function MeetTheTeam() {
  const teamMembers = [
    {
      name: "Jane Doe",
      role: "CEO & Founder",
      bio: "Jane leads the company with a vision for innovation and excellence.",
      imageUrl: "https://via.placeholder.com/150?text=Jane",
    },
    {
      name: "John Smith",
      role: "CTO",
      bio: "John oversees all technical aspects, ensuring our products are top-notch.",
      imageUrl: "https://via.placeholder.com/150?text=John",
    },
    {
      name: "Alice Johnson",
      role: "CMO",
      bio: "Alice drives our marketing strategies and builds strong customer relationships.",
      imageUrl: "https://via.placeholder.com/150?text=Alice",
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-4 md:mb-8">
        Our Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.2, type: "spring" }}
          >
            <Card key={index}>
              <CardHeader className="flex justify-center">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-md text-gray-600">{member.role}</p>
                <p className="text-sm mt-2">{member.bio}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
