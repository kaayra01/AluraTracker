import { NotificationType } from "@/interfaces/INotification"
import { NOTIFICAR } from "@/store/mutations-type"
import { store } from "@/store"

export const mixinNotification = {
    methods: {
        notificar (type: NotificationType, title: string, text: string) : void {
            store.commit(NOTIFICAR, {
                title,
                text,
                type
            })
        }
    }
}