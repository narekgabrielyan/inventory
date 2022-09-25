import React, {PropsWithChildren} from "react";

export type NotificationPopupProps = PropsWithChildren<{
    title: string;
    onPopupClose: () => void
}>;

export const NotificationPopup = ({title, onPopupClose}: NotificationPopupProps) => {
    return (
        <div className="popup_wrapper">
            <div className="popup_content">
                <div className="popup_header">Ooops! <i className="icon-warning"/></div>
                <div className="popup_body">
                    {title}
                    <button onClick={() => onPopupClose()}>OK</button>
                </div>
            </div>
        </div>
    )
}