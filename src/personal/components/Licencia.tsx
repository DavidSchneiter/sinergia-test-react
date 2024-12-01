import { FunctionComponent } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { useColaborators } from "../../provider/ColaboratorContext";

// Componente de la licencia
const Licencia: FunctionComponent = () => {
  const {formData, setFormData, isEditing} = useColaborators()
  // Evento para manejar el cambio de estado del checkbox de inactividad
    const handleInactivoChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const isChecked = event.target.checked;
        setFormData((prevData) => ({
            ...prevData,
            inactivo: isChecked,
            // Si se deselecciona, limpiar las fechas de ausencia
            inicioAusencia: isChecked ? prevData.inicioAusencia : null,
            finAusencia: isChecked ? prevData.finAusencia : null,
        }));
    };
    // Evento para manejar el cambio de fechas de ausencia
    const handleDateChange =
        (field: "inicioAusencia" | "finAusencia") => (date: Date | null) => {
            const formattedDate = date ? format(date, "yyyy-MM-dd") : null; // Convertimos a LocalDate
            setFormData({ ...formData, [field]: formattedDate });
        };
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', justifyContent: 'space-around' }}>
        <label>
          <input
            type="checkbox"
            checked={formData.inactivo}
            onChange={handleInactivoChange}
            disabled={!isEditing}
          />
          Inactivo
        </label>

        {/* Fechas de ausencia, habilitadas solo si 'Inactivo' está marcado */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div>
            <label style={{ color: '#007bff', cursor: 'pointer' }}>
              Inicio de ausencia:
            </label>
            <DatePicker
              selected={formData.inicioAusencia ? new Date(formData.inicioAusencia) : null}
              onChange={handleDateChange('inicioAusencia')}
              dateFormat="yyyy-MM-dd"
              placeholderText="Seleccione fecha de inicio"
              disabled={!formData.inactivo || !isEditing} // Deshabilitar si no está inactivo
            />
          </div>

          <div>
            <label style={{ color: '#007bff', cursor: 'pointer' }}>
              Fin de ausencia:
            </label>
            <DatePicker
              selected={formData.finAusencia ? new Date(formData.finAusencia) : null}
              onChange={handleDateChange('finAusencia')}
              dateFormat="yyyy-MM-dd"
              placeholderText="Seleccione fecha de fin"
              disabled={!formData.inactivo || !isEditing} // Deshabilitar si no está inactivo
            />
          </div>
        </div>
      </div>
    );
};

export default Licencia;
