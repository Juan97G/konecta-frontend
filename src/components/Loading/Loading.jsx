import React from 'react';
import "./styles.css";
import { Dimmer } from "semantic-ui-react";

const Loading = () => {
   return (
      <Dimmer active>
         <div className="loader"></div>
      </Dimmer>
   );
};

export default Loading;
