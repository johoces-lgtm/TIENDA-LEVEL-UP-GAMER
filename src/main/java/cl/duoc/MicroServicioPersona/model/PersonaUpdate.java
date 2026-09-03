package cl.duoc.MicroServicioPersona.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonaUpdate {
    private char dv;
    private String nombre;
}
