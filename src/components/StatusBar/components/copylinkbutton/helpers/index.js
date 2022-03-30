import localUrl from "../../../../../services/localUrl";

export function storedUrl() {
    return localUrl().add({
        data: window.location.href,
        description: "From Shared URL",
    });
}
