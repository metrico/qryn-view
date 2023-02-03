import { AggregationsBuilder } from "./";

const aggregation = AggregationsBuilder("sum");
const initial = '{type="clickhouse"}';

describe('Aggregations from Operations functions',()=>{
    test("aggregations adds an aggregation function", () => {
        const simplebuild = aggregation.build(initial);
        expect(simplebuild).toBe(`sum(${initial})`);
    });
    
    test("addLabel should add a label into the labels list", () => {
        aggregation.addLabel("level");
    
        expect(aggregation.labels).toStrictEqual(["level"]);
    });
    
    test("labelsToString should convert labels into a separated by commas string", () => {
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
    
    test("setAggrTypeString should add the aggregation type together with the labels", () => {
        aggregation.setAggrTypeString();
    
        expect(aggregation.aggrTypeString).toBe("without(level,host)");
    });
    
    test("build makes the complete string with labels and aggregation type", () => {
        const complete = aggregation.build(initial);
        expect(complete).toBe('sum without(level,host) ({type="clickhouse"})');
    });
    
})

