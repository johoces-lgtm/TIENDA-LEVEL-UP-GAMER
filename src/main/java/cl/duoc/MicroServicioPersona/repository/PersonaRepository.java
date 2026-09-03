package cl.duoc.MicroServicioPersona.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import cl.duoc.MicroServicioPersona.model.Persona;

@Repository
public class PersonaRepository {

    // Lista de personas
    private final List<Persona> listaPersonas = new ArrayList<>();

    // Listar todas las personas de la lista
    public List<Persona> obtenerPersonas() {
        return new ArrayList<Persona>(listaPersonas);
    }

    //Buscar una persona de la lista
    public Optional<Persona> buscarPorRut(int rut) {
        for (Persona persona : listaPersonas) {
            if (persona.getRut() == rut) {
                return Optional.of(persona);
            }
        }
        return Optional.empty();
    }

    //Guardar una persona en la lista
    public Persona guardarPersona(Persona persona) {
        listaPersonas.add(persona);
        return persona;
    }

    //Actualizar una persona de la lista
    public Optional<Persona> actualizarPersona(Persona persona) {
        for (Persona user : listaPersonas) {
            if (persona.getRut() == user.getRut()) {
                user.setNombre(persona.getNombre());
                user.setDv(persona.getDv());
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    //Eliminar una persona de la lista
    public void eliminarPersona(Persona persona) {
        listaPersonas.remove(persona);
    }
}
