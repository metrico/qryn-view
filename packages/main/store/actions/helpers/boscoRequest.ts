

const boscoInit = (params: any) => {
    (window as any).bosco.init(
        {
            endpoint: params.url,
        }
    )
}

export default function boscoRequest(src: any, params: any) {

    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.setAttribute('src', src)

        script.addEventListener('load', () => {
            resolve(boscoInit(params))
        })
        script.addEventListener('error', reject)
        document.body.appendChild(script)
    })

}



export function boscoSend(data: any, id: any) {
    (window as any).bosco.send(data, id)
}