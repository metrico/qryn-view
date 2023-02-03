import { AggregationsBTKBuilder } from "./";

const aggregation = AggregationsBTKBuilder("topk");
const initial = '{type="clickhouse"}';

describe('topk and bottomk aggregations functions from operators',()=>{

    test("aggregations adds an aggregation function", () => {
        const simplebuild = aggregation.build(initial);
        expect(simplebuild).toBe(`topk (5, ${initial})`);
    });
    
    test("addLabel should add a label into the labels list", () => {
        aggregation.addLabel("level");
        expect(aggregation.labels).toStrictEqual(["level"]);
    });
    
    test("setLabels should convert labels into a separated by commas string", () => {
        aggregation.addLabel("host");
        aggregation.setLabels();
        expect(aggregation.labelString).toBe("level,host");
    });
    
    test("setAggrType should change the aggregation type to by or without", () => {
        aggregation.setAggrType("by");
        expect(aggregation.aggrType).toBe("by");
        aggregation.setAggrType("without");
        expect(aggregation.aggrType).toBe("without");
    });

    test("setKValue should change the k value", ()=>{
        aggregation.setKValue(3)
        expect(aggregation.kvalue).toBe(3)
    } )
    
    test("setAggrTypeString should add the aggregation type together with the labels", () => {
        aggregation.setAggrTypeString();
        expect(aggregation.aggrTypeString).toBe("without(level,host)");
    });
    
    test("build makes the complete string with labels and aggregation type", () => {
        const complete = aggregation.build(initial);
        expect(complete).toBe('topk without(level,host) (3, {type="clickhouse"})');
    });

})
