import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "motion/react";
export default function MeetTheTeam() {
  const teamMembers = [
    {
      name: "Jane Doe",
      role: "CEO & Founder",
      bio: "Jane leads the company with a vision for innovation and excellence.",
      imageUrl:
        "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "John Smith",
      role: "CTO",
      bio: "John oversees all technical aspects, ensuring our products are top-notch.",
      imageUrl:
        "https://images.unsplash.com/photo-1630910561339-4e22c7150093?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Alice Johnson",
      role: "CMO",
      bio: "Alice drives our marketing strategies and builds strong customer relationships.",
      imageUrl:
        "https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
