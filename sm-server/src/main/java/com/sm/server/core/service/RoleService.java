package com.sm.server.core.service;

import com.sm.server.core.entities.Role;
import com.sm.server.core.repositories.RoleRepository;
import com.sm.server.service.GenericService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService implements GenericService<Role, Long> {
    private final RoleRepository repository;

    public RoleService(RoleRepository repository) {
        this.repository = repository;
    }

    @Override
    public Role save(Role object) {
        Role role = repository.save(object);
        return role;
    }

    public Role getByName(String name) {
        return repository.findByName(name);
    }

    @Override
    public List<Role> getAll() {
        return null;
    }

    @Override
    public Role getByID(Long id) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
