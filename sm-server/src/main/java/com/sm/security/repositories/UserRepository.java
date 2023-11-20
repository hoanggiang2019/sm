package com.sm.security.repositories;

import com.sm.security.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT e FROM User e where e.username = ?1")
    User findByUserName(String username);

    Optional<User> getByUsername(String username);
}
