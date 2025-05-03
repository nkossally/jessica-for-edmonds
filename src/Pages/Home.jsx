import { Carousel } from "../Components/Carousel";

export const Home = () => {
  const carouselItems = [
    { name: "blarg 1", imagePath: "katie_logo.png", description: "First slide" },
    { name: "blarg 2", imagePath: "slider-2.png", description: "Second slide" },
  ];
  return (
      <div>
        <Carousel items={carouselItems}></Carousel>
      </div>
  )
};
