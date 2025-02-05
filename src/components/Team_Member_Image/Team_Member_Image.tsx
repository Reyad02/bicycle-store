import Shining_images_part from "../Shining_images_part/Shining_images_part";

interface ITeam_Member_Image {
  image: string;
  name: string;
  position: string;
}

const Team_Member_Image = ({ image, name, position }: ITeam_Member_Image) => {
  return (
    <div className="flex gap-2 flex-col">
      <div className=" relative md:h-full ">
        <Shining_images_part img={image} />
      </div>
      <p className="text-[#0BBA48] text-center lg:text-left">{position}</p>
      <p className="text-xl font-semibold text-center lg:text-left">{name}</p>
    </div>
  );
};

export default Team_Member_Image;
