import PrismModule from "prismjs";

const Prism = ((PrismModule as any).default ?? PrismModule) as typeof PrismModule;

(globalThis as any).Prism = Prism;

await Promise.all([
    import("prismjs/components/prism-promql"),
    import("prismjs/components/prism-sql"),
]);

export default Prism;
