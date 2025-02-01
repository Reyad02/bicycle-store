interface ISection_Heading {
  section: string;
  title: string;
  description: string;
}
const Section_Heading = ({ section, title, description }: ISection_Heading) => {
  return (
    <>
      <div className="flex gap-4">
        <div className="w-10 h-6 bg-[#0BBA48]"></div>
        <p className="uppercase text-lg font-thin">{section}</p>
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold uppercase">
        {title}
      </h1>
      <p className="text-[#555555]">{description}</p>
    </>
  );
};

export default Section_Heading;
