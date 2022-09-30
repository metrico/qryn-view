
/**
 * from : aliasSrc
 * to : aloasDst
 * message : qseqm
 * from_port
 * to_port
 *
 */

export const exampleCall = []
export const mappedCall = () => {
    const parsed = JSON.parse(JSON.stringify(exampleCall));
    return parsed.map(({ aliasSrc, aliasDst, cseqm, raw,from_domain,to_domain }) => {
        let src = "";
        if (aliasSrc.includes(":")) {
            src = aliasSrc.replace(":", "#58;");
        } else {
            src = from_domain;
        }

        let dst = "";
        if (aliasDst.includes(":")) {
            dst = aliasDst.replace(":", "#58;");
        } else {
            dst = to_domain;
        }

        let rawMsg = "";
        if(raw.includes(":")) {
            const splitted = raw.split(/\r?\n/)
            if(splitted[0].includes(cseqm)) {
                const filtered = splitted[0].split(`${cseqm}`).join("")
                rawMsg = filtered.replaceAll(";"," ").replaceAll(":","#58;")
            } else {
                rawMsg = splitted[0].replaceAll(";"," ").replaceAll(":","#58;")
            }
        }
        return {
            from: src,
            to: dst,
            message: cseqm,
            raw: rawMsg
        };
    });
};

export const stringCall = (mapped) => {
    let lineJump = `\n`;
    let initial = `sequenceDiagram`;

    let sequence = `${initial}${lineJump}autonumber${lineJump}`;

    for (let line of mapped) {
        
        let linexp = `
        ${line["from"]}-->>${line["to"]}:[ ${line["message"]} ] ${line["raw"]}
        `;
        sequence += linexp;
    }

    return sequence;
};

export const exampleCallDiagram = stringCall(mappedCall());
