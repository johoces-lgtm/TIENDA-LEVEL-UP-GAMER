package cl.duoc.MicroServicioPersona.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.duoc.MicroServicioPersona.model.Persona;
import cl.duoc.MicroServicioPersona.model.PersonaUpdate;
import cl.duoc.MicroServicioPersona.service.PersonaService;

@RestController
@RequestMapping("/api/v1/personas")
public class PersonaController {

    @Autowired
    private PersonaService personaService;

    // GET para listar todas las personas
    @GetMapping
    public List<Persona> obtenerPersonas() {
        return personaService.obtenerPersonas();
    }

    // GET para buscar persona por rut
    @GetMapping("/{rut}")
    public Persona buscarPorRut(@PathVariable int rut) {
        return personaService.buscarPorRut(rut);
    }

    // POST para guardar persona
    @PostMapping
    public Persona guardarPersona(@RequestBody Persona persona) {
        return personaService.guardarPersona(persona);
    }

    // PUT para actualizar persona
    @PutMapping("/{rut}")
    public Persona actualizarPersona(@PathVariable int rut, @RequestBody PersonaUpdate personaUpdate) {
        Persona p = new Persona();
        p.setRut(rut);
        p.setDv(personaUpdate.getDv());
        p.setNombre(personaUpdate.getNombre());        
        return personaService.actualizarPersona(p);
    }

    // DELETE para eliminar persona
    @DeleteMapping("/{rut}")
    public void eliminarPersona(@PathVariable int rut) {
        personaService.eliminarPersona(rut);
    }

}
