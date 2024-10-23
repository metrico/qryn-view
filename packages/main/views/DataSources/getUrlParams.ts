export function getURLParams(params: any) {
    const url = params.replace(/#/, "");
    const decoded = decodeURIComponent(url);
    const urlParams = new URLSearchParams(decoded);
    let panels = { left: "", right: "" };
    for (let [key, val] of urlParams) {
        if (key === "left" || key === "right") {
            panels[key] = JSON.parse(val);
        }
    }
}
