package cl.duoc.MicroServicioPersona.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.duoc.MicroServicioPersona.model.Persona;
import cl.duoc.MicroServicioPersona.repository.PersonaRepository;

@Service
public class PersonaService {

    @Autowired
    private PersonaRepository personaRepository;

    // Listar todas las personas
    public List<Persona> obtenerPersonas() {
        return personaRepository.obtenerPersonas();
    }

    // Buscar persona por rut
    public Persona buscarPorRut(int rut) {
        if (rut <= 0) {
            throw new IllegalArgumentException("El rut debe ser mayor a 0");
        }

        return personaRepository.buscarPorRut(rut)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada con rut: " + rut));
    }

    // Guardar persona
    public Persona guardarPersona(Persona persona) {
        if (persona == null || persona.getRut() <= 0 || persona.getNombre() == null || persona.getNombre().isBlank()) {
            throw new IllegalArgumentException("Datos de persona erróneos");
        }

        if (personaRepository.buscarPorRut(persona.getRut()).isPresent()) {
            throw new RuntimeException("La persona ya existe con rut: " + persona.getRut());
        }

        return personaRepository.guardarPersona(persona);
    }

    // Actualizar persona
    public Persona actualizarPersona(Persona persona) {
        if (persona == null || persona.getRut() <= 0 || persona.getNombre() == null || persona.getNombre().isBlank()) {
            throw new IllegalArgumentException("Datos de persona inválidos");
        }

        return personaRepository.actualizarPersona(persona)
                .orElseThrow(() -> new RuntimeException("No existe la persona a actualizar con rut: " + persona.getRut()));
    }

    // Eliminar persona
    public void eliminarPersona(int rut) {
        if (rut <= 0) {
            throw new IllegalArgumentException("El rut debe ser mayor a 0");
        }

        Persona persona = personaRepository.buscarPorRut(rut)
                .orElseThrow(() -> new RuntimeException("No existe la persona a eliminar con rut: " + rut));

        personaRepository.eliminarPersona(persona);
    }
}