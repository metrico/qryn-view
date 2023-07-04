export default function sliceAvatar(name:string):string {
    return name.split(" ").map(m => m[0].toUpperCase()).slice(0,3).join("")
}