import type Phase from "./Phase.js";

const phaseModel = {
    id: Number,
    name: String,
    description: String,
    image: URL,

    phases: Array<typeof Phase>
};

export default phaseModel;