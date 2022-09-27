package com.servico.email.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.servico.email.model.EmailModel;

public interface EmailRepository extends MongoRepository<EmailModel, String> {

}
