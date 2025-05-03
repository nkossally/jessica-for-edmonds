import { Carousel } from "../Components/Carousel";

export const Home = () => {
  const carouselItems = [
    { name: "blarg 1", imagePath: "/slider-1.png", description: "First slide" },
    { name: "blarg 2", imagePath: "/slider-2.png", description: "Second slide" },
  ];
  return (
      <div>
        <Carousel items={carouselItems}></Carousel>
      </div>
  )
};
