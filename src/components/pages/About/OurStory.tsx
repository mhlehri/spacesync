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
    <div className="p-6 mx-auto py-12">
      <h2 className="text-3xl font-semibold text-gray-900 mb-8 underline underline-offset-8 ">
        Our Story
      </h2>
      <div className="flex gap-4 justify-between items-center flex-wrap md:flex-nowrap">
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
        <img
          className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover max-w-lg"
          src="https://pagedone.io/asset/uploads/1717742431.png"
          alt="about Us image"
        />
      </div>
    </div>
  );
}

export default OurStory;
