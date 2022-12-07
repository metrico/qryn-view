

const boscoInit = (params) => {
    window.bosco.init(
        {
            endpoint: params.url,
          }
    )
   

} 

export default function boscoRequest(src, params){

    return new Promise((resolve, reject)=> {
        const script = document.createElement('script')
        script.setAttribute('src', src)

        script.addEventListener('load', () => {
            resolve( boscoInit(params))
        })
        script.addEventListener('error', reject)
        document.body.appendChild(script)
    })

}



export function boscoSend(data,id) {
    window.bosco.send(data,id)
}