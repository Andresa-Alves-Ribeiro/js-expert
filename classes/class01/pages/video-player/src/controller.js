export default class Controller {
    #view
    #service
    #worker
    #blinkedCounter = 0

    constructor({ view, service, worker }) {
        this.#view = view
        this.#service = service
        this.#worker = this.#configureWorker(worker)
        this.#view.configureOnBtnClick(this.onBtnStart.bind(this))
    }


    static async initialize(deps) {
        const controller = new Controller(deps)
        controller.log('Not yet dectecting eye  blink!')
        return controller.init()
    }

    #configureWorker(worker) {
        let ready = false
        worker.onmessage = ({ data }) => {
            if('READY' === data) {
                console.log('worker is ready')
                this.#view.enableButton()
                ready = true
                return
            }

            const blinked = data.blinked
            this.#blinkedCounter += blinked
            console.log('blinked', blinked)
        }

        return worker
    }

    async init() {
        console.log('init!')
    }

    log(text) {
        this.#view.log(`logger: ${text}`)
    }

    onBtnStart() {
        this.log('initializing detection...')
        this.#blinkedCounter = 0
    }
}