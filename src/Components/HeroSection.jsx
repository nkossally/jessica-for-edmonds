export const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-inner-container">
      <div className="hero-row-one">
        <div className="red-name">Jessica</div>
        <div className="for">for</div>
        <div className="red-name">Edmonds</div>
      </div>
      <div className="hero-row-two">City Council Pos. 2</div>
      <img
        className="wave"
        src={process.env.PUBLIC_URL + "/" +"wave_blue.svg"}
      />
      <div className="hero-name">Jessica Bachman</div>
      <div className="hero-text">is running for City Council to</div>

      <div className="hero-text">lower the cost of living for</div>

      <div className="hero-text">working class Edmonders.</div>
      <img
        className="hero-image"
        src={process.env.PUBLIC_URL + "/" + "Jessica_Bachman.png"}
      />
    </div>
    </div>
  );
};
