import classNames from "classnames";

export const PanelTwo = () => {
  return (
    <div className={classNames("panel", "panel-two")}>
      <div className="inner-panel">
        <div className="panel-title"> Lorem ipsum dolor sit amet</div>
        <div className="panel-quote">“My campaign is for...</div>
      </div>
    </div>
  );
};
