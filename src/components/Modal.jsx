import React, { useRef } from 'react'


const Modal = ({ title, closeModal, handleCloseModal, children }) => {

    return (
        <div
            className="the-modal" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
            <div
                className="bg-white border5-radius full-width" style={{ height: "fit-content", maxWidth: 500, minWidth: 250 }}>
                <header
                    className="bg-heading bold padd10 center-text margin10-bottom relative flex-between" >
                    <h2
                        className="font16 bold">{title} </h2>
                    <i
                        onClick={closeModal}

                        className="fa fa-close modal-close font15">
                    </i>

                </header>
                {children}


            </div>
        </div>
    )
}

export default Modal;