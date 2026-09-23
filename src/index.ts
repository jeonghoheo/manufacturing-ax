import { routing } from "./data";
import { createWorkStep } from "./createWorkStep";

const workStep = routing.map(createWorkStep);
console.log("Work Step:", workStep);
