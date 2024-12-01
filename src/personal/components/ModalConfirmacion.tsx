import { FunctionComponent, MouseEventHandler } from "react";
import '../style/modal.css'

interface ModalConfirmacionProps {
    mensaje: string;
    onConfirmar: MouseEventHandler<HTMLButtonElement>;
    onCancelar: () => void;
    visible: boolean;
}
// Modal reutilizable para boton de confirmacion
const ModalConfirmacion: FunctionComponent<ModalConfirmacionProps> = ({
    mensaje,
    onConfirmar,
    onCancelar,
    visible,
}) => {
    if (!visible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-contenido">
                <p>{mensaje}</p>
                <div className="modal-botones">
                    <button type='submit' onClick={onConfirmar} className="btn-confirmar">
                        Confirmar
                    </button>
                    <button onClick={onCancelar} className="btn-cancelar">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacion;
