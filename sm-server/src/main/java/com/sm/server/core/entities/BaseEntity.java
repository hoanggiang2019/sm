package com.sm.server.core.entities;

import com.sm.server.core.auditing.AuditListener;
import com.sm.server.core.auditing.AuditableEntity;
import jakarta.persistence.*;

import java.io.Serial;
import java.util.UUID;

@MappedSuperclass
@EntityListeners(AuditListener.class)
public class BaseEntity extends AuditableEntity {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "uuid")
    private UUID uuid;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }
}
