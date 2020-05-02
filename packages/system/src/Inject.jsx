/**
 * @function Inject
 * @summary A HOC to inject Context.Consumer prop.
 */
/* --- Global --- */
import React from "react";
import { Component } from "@horizin/ui-compose";

/* --- Local --- */
import Context from "./Context";

/* --- Component --- */
const Inject = (ComponentRender, props) => (
  <Context.Consumer>
    {ethers => <>{Component(ComponentRender, { ethers, ...props })}</>}
  </Context.Consumer>
);

export default Inject;
