import React, { Component } from "react";
import { QueryBar } from "./QueryBar";
import { ValuesList } from "./ValuesList";

export default function LabelBrowser(){

    return (
        <div>
        <QueryBar className="query-bar-placeholder"/>

        <ValuesList />

    </div>
    )
}
