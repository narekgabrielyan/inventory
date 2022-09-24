import React, {PropsWithChildren} from "react";

export type NotificationPopupProps = PropsWithChildren<{
    title: string;
    onPopupClose: () => void
}>;

export const NotificationPopup = ({title, onPopupClose}: NotificationPopupProps) => {
    return (
        <div className="notification_popup" draggable>
            <div className="notification_title">
                {title}
            </div>
            <button onClick={() => onPopupClose()}></button>
        </div>
    )
}