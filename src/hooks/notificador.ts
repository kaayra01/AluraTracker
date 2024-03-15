import { NotificationType } from "@/interfaces/INotification"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/mutations-type"

type Notificador = {
    notificar: (type: NotificationType, title: string, text: string) => void
}

export default () : Notificador => {

    const notificar = (type: NotificationType, title: string, text: string) : void => {
        store.commit(NOTIFICAR, {
            title,
            text,
            type
        })
    }

    return {
        notificar
    }
}