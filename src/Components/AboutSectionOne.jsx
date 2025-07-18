import classNames from "classnames";
export const AboutSectionOne = () => {
  return (
    <div className="about-section-one">
      <h1 className={classNames("half-section", "about-section-one-text")}>
        Jessica Bachman is running for --- to ---
      </h1>

      <div className="half-section">
        <img
          className="about-section-one-image"
          src={process.env.PUBLIC_URL + "/" + "jessica 14.png"}
        />
      </div>
    </div>
  );
};
