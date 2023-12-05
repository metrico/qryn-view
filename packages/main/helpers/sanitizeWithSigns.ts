
export const convertEntityToBrackets = (text) => {
    const entities = /&(lt|gt|amp);/;

    const isEntityUsed = entities.test(text);

    if(text === undefined) {
        return ""
    }

    if (isEntityUsed) {
        return text
            ?.replaceAll(/&lt;/g, "<")
            ?.replaceAll(/&gt;/g, ">")
            ?.replaceAll(/&amp;/g, "&");
    } else {
        return text;
    }
};

// text sanitizer to include special characters
export default function sanitizeWithSigns(text: string) {
    return String(convertEntityToBrackets(text));
}
