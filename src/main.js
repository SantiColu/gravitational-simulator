import "./index.css";
import { configs } from "./config";
import { Controls } from "./controls";
import { Simulation } from "./simulation";
import "bootstrap-icons/font/bootstrap-icons.css";

const canvas = document.getElementById("canvas");

const bodys = configs["punto-4"];

const simulation = new Simulation(canvas, bodys);

const controls = new Controls(simulation);
