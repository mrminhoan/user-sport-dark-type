import React, { memo, useEffect } from "react";

const BasketBall = ({ fixtureId }) => {
  useEffect(() => {
    if (fixtureId) {
      const script = document.createElement("script");
      script.innerHTML = `
        !(function(){
        var d="STATSCOREWidgetsEmbederScript";
        if(!window.document.getElementById(d)){
            window.STATSCOREWidgets={};
            window.STATSCOREWidgets.onLoadCallbacks=[];
            window.STATSCOREWidgets.onLoad=function(d){
            window.STATSCOREWidgets.onLoadCallbacks.push(d)
            };
            var n=window.document.createElement("script");
            n.src="https://wgt-s3-cdn.statscore.com/bundle/Embeder.js";
            n.async=!0;
            n.id=d;
            n.addEventListener("error",function(d){
                for(var n=0;n<window.STATSCOREWidgets.onLoadCallbacks.length;n++)
                window.STATSCOREWidgets.onLoadCallbacks[n](d)
            });
            window.document.body.appendChild(n)
        }
        }());
        window.STATSCOREWidgets.onLoad(function(e){
        if(e){
            console.error(e);
            return;
        }
        new window.STATSCOREWidgets.Widget(
            document.getElementById("STATSCOREWidget17135923922278"),
            "6613db46e8aa4ed7e754d85c",
            {"language":"en","eventId":"m:${fixtureId}"},
            {loader:{enabled:true}}
        );
    });
    `;

      document.body.appendChild(script);

      // Clean up function to remove the script when the component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [fixtureId]);

  return (
    <div
      id="STATSCOREWidget17135923922278"
      className="w-full text-center mb-2"
    ></div>
  );
};

export default memo(BasketBall);
