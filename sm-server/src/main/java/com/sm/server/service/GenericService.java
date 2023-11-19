package com.sm.server.service;

import java.util.List;

public interface GenericService<T, E> {

    T save(T object);

    List<T> getAll();

    T getByID(E id);

    void delete(E id);
}
