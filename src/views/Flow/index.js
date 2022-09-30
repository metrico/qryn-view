import FlowConfig from "./FlowConfig";
import { exampleCallDiagram } from "./example";
export default function Flow() {
    return (
        <div className="App">
            <h1>React Mermaid Example</h1>
            <FlowConfig chart={exampleCallDiagram} />
        </div>
    );
}
