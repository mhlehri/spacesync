import MeetTheTeam from "@/components/pages/About/MeetTheTeam";
import OurMission from "@/components/pages/About/OurMission";
import OurStory from "@/components/pages/About/OurStory";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <OurMission />
      <MeetTheTeam />
      <OurStory />
    </div>
  );
}
