package com.sm.security.repositories;

import com.sm.security.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoleRepository extends JpaRepository<Role, Long> {

    @Query("SELECT e FROM Role e WHERE e.name = ?1")
    Role findByName(String name);
}
