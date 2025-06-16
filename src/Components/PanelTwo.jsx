import classNames from "classnames";

export const PanelTwo = () => {
  return (
  <div className={classNames("panel", "panel-two")}>
       <div className="half-panel"></div>

      <div className="half-panel">
        <div className="panel-title"> Lorem ipsum dolor</div>
        <div className="panel-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac erat
          sed enim tincidunt tempor. Quisque at accumsan ex. Nulla tincidunt
          massa ligula
        </div>
        <div className="panel-text">
          Nunc finibus finibus malesuada. Nullam non ornare turpis. In iaculis,
          leo ac sagittis rhoncus, felis tellus efficitur mauris, eget faucibus
          dolor tellus sit amet nunc.
        </div>
      </div>
    </div>
  );
};