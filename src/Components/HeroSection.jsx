export const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-row-one">
        <div className="red-name">Jessica</div>
        <div className="for">for</div>
        <div className="red-name">Edmonds</div>
      </div>
      <div>City Council Pos. 2</div>
      <div>Jessica Bachman</div>
      <div className="">is running for City Council to</div>

      <div className="">lower the cost of living for</div>

      <div className="">working class Edmonders.</div>
      <img
        className="hero-image"
        src={process.env.PUBLIC_URL + "/" + "jessica 14.png"}
      />
    </div>
  );
};
