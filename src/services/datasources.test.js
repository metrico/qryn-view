import { DataSource } from "./datasources";

describe("Get and set datasource name",()=>{
    const ds = new DataSource();
    test("set datasource name and should be a string",()=>{
        ds.setName("LogQl")
        expect(ds.getName() === "LogQl").toBe(true)
        expect(typeof ds.getName() === 'string').toBe(true)
    })

    test("set an error if Datasource nme is not a string", () => {
        ds.setName(<span>this is the datasorce name</span>)
        const nameError = ds.getError("name")
        expect(ds.getName()).toBe("LogQl")
        expect(nameError).toBe("Datasource Name Should be a String")
        
    })
})

describe("Get and set datasource url", () => {
    const ds = new DataSource();

    test(`set an url and should be a string ${typeof ds}`, () => {
        ds.setUrl("http://localhost:4200");

        expect(ds.getUrl()).toBe("http://localhost:4200");
        expect(typeof ds.getUrl() === "string").toBe(true);
        expect(typeof ds.getUrl() === "number").toBe(false);
    });

    test("set an error if url is not a string", () => {
        ds.setUrl(<span>testing the app</span>);
        const errors = ds.getError("url");
        expect(ds.getUrl()).toBe("http://localhost:4200");
        expect(errors).toBe("Datasource URL Should be a String");
    });
});
/*
describe("Get and Set derived field",()=>{
    const df = new DerivedFiled()
    
    
 
    df.setUrlLabel("traceID")
    df.setInternalLink(true)
    df.setInternalLinkOpt('Tempo')
    const derivedObj = df.data()
    const derivedTest = {
        name:'traceId',
        regex: /^.*?traceI[d|D]=(\w+).*$/,
        query: '${__value.raw}',
        urlLabel: "traceID",
        internalLinkOpt : "Tempo"
        

    }

    test("Set Derived fileds",()=>{
        it("Should set and get Derived Field name",()=>{
            df.setName('traceId')
            expect(df.getName()).toBe("traceId")

        })
        it("should set and get DF Regex",()=> {
            df.setRegex(/^.*?traceI[d|D]=(\w+).*$/)
            expect(df.getRegex()).toBe(/^.*?traceI[d|D]=(\w+).*$/)
        })
        it("should set and get DF Query",()=>{
            df.setQuery("${__value.raw}")
            expect(df.getQuery()).toBe("${__value.raw}")
        })
        it("should set and get DF Internal Link boolean",()=>{
            df.setInternalLink(true)
            expect(df.getInternalLink()).toBe(true)
        }) 
        it("should set url label",()=> {

        })
    })
    




})
*/