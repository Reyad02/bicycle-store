interface IShiningImagesPartProps {
  img: string;
}
const Shining_images_part = ({ img }: IShiningImagesPartProps) => {
  return (
    <>
      <img  src={img} alt="" className=" rounded-sm md:h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden transition-all duration-500 ease-in-out hover:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%,transparent_100%)] hover:bg-[length:250%_250%] hover:bg-[position:100%_0]"></div>
    </>
  );
};

export default Shining_images_part;
