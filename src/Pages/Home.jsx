import { Carousel } from "../Components/Carousel";
import { AboutSectionOne } from "../Components/AboutSectionOne";
export const Home = () => {
  const carouselItems = [
    { name: "blarg 1", imagePath: "slider-1.png", description: "First slide" },
    { name: "blarg 2", imagePath: "slider-2.png", description: "Second slide" },
    { name: "blarg 2", imagePath: "slider-3.png", description: "Second slide" },
    { name: "blarg 2", imagePath: "slider-4.png", description: "Second slide" },
    { name: "blarg 2", imagePath: "slider-5.png", description: "Second slide" },
    { name: "blarg 2", imagePath: "slider-6.png", description: "Second slide" },
    { name: "blarg 2", imagePath: "slider-7.png", description: "Second slide" },

  ];
  return (
      <div>
        {/* <Carousel items={carouselItems}></Carousel> */}
        <AboutSectionOne/>
      </div>
  )
};
