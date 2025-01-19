import Timeline, { TimelineItem } from "./TimeLine";

function OurStory() {
  const milestones = [
    {
      date: "2010",
      title: "Founded in 2010",
      description: "Our journey began with a small team and a big idea.",
    },
    {
      date: "2012",
      title: "Launched Our First Product",
      description:
        "We introduced our flagship product, revolutionizing the industry.",
    },
    {
      date: "2015",
      title: "Expanded Globally",
      description: "Our services reached new markets around the world.",
    },
    {
      date: "2020",
      title: "Acquired by TechCorp",
      description:
        "We joined forces with TechCorp, fueling further innovation.",
    },
  ];

  return (
    <div className="p-6 mx-auto w-fit py-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-4 md:mb-8">
        Our Story
      </h2>
      <Timeline>
        {milestones.map((milestone, index) => (
          <p>
            <TimelineItem
              key={index}
              index={index}
              date={milestone.date}
              title={milestone.title}
              description={milestone.description}
            >
              {/* <TimelinePoint /> */}
            </TimelineItem>
          </p>
        ))}
      </Timeline>
    </div>
  );
}

export default OurStory;
