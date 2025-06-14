import type React from "react";
import { useState } from "react";
import { HomeWidget } from "../../../widgets/hom-widget/ui/HomeWidget";
import { userStore } from "../../../entities/user/model/user.store";

const HomePage: React.FC = (): React.JSX.Element => {
    const [createModal, setCreateModal] = useState(false)

    const handleModal = () => {
        setCreateModal(!createModal)
    }
    return (
        <div className="home">
            {
                userStore.user ?
                <HomeWidget />
                :
                <h1>
                    Не авторизован
                </h1>
            }
        </div>
    )
}
export default HomePage