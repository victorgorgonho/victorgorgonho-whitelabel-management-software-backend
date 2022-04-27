import { Joi } from 'celebrate';

class Schemas {
  createAdminSchema = {
    body: Joi.object().keys({
      email: Joi.string().email().required().messages({
        'string.base': `"Email" deveria ser do tipo texto`,
        'string.empty': `"Email" não pode ser vazio`,
        'string.email': `"Email" não é um e-mail válido`,
        'any.required': `"Email" é obrigatório`,
      }),
      password: Joi.string().min(6).required().messages({
        'string.base': `"Senha" deveria ser do tipo texto`,
        'string.empty': `"Senha" não pode ser vazio`,
        'string.min': `"Senha" deve ter no mínimo 6 dígitos`,
        'any.required': `"Senha" é obrigatório`,
      }),
      name: Joi.string().required().messages({
        'string.base': `"Nome" deveria ser do tipo texto`,
        'string.empty': `"Nome" não pode ser vazio`,
        'any.required': `"Nome" é obrigatório`,
      }),
      user_type: Joi.string().required().messages({
        'string.base': `"Tipo de usuário" deveria ser do tipo texto`,
        'string.empty': `"Tipo de usuário" não pode ser vazio`,
        'any.required': `"Tipo de usuário" é obrigatório`,
      }),
      birthDate: Joi.string().optional(),
    }),
  };

  createStudentSchema = {
    body: Joi.object().keys({
      email: Joi.string().email().required().messages({
        'string.base': `"Email" deveria ser do tipo texto`,
        'string.empty': `"Email" não pode ser vazio`,
        'string.email': `"Email" não é um e-mail válido`,
        'any.required': `"Email" é obrigatório`,
      }),
      name: Joi.string().required().messages({
        'string.base': `"Nome" deveria ser do tipo texto`,
        'string.empty': `"Nome" não pode ser vazio`,
        'any.required': `"Nome" é obrigatório`,
      }),
      phone: Joi.string().min(8).required().messages({
        'string.base': `"Telefone" deveria ser do tipo texto`,
        'string.empty': `"Telefone" não pode ser vazio`,
        'string.min': `"Telefone" deve ter no mínimo 8 dígitos`,
        'any.required': `"Telefone" é obrigatório`,
      }),
      gender: Joi.string().required().messages({
        'string.base': `"Gênero" deveria ser do tipo texto`,
        'string.empty': `"Gênero" não pode ser vazio`,
        'any.required': `"Gênero" é obrigatório`,
      }),
      user_type: Joi.string().required().messages({
        'string.base': `"Tipo de usuário" deveria ser do tipo texto`,
        'string.empty': `"Tipo de usuário" não pode ser vazio`,
        'any.required': `"Tipo de usuário" é obrigatório`,
      }),
      birthDate: Joi.string().required().messages({
        'string.base': `"Data de nascimento" deveria ser do tipo texto`,
        'string.empty': `"Data de nascimento" não pode ser vazio`,
        'any.required': `"Data de nascimento" é obrigatório`,
      }),
      registration: Joi.string().required().messages({
        'string.base': `"Matrícula" deveria ser do tipo texto`,
        'string.empty': `"Matrícula" não pode ser vazio`,
        'any.required': `"Matrícula" é obrigatório`,
      }),
      subjects: Joi.array()
        .items(
          Joi.string().required().messages({
            'string.base': `Uma matéria deveria ser um tipo de texto`,
            'string.empty': `Uma matéria não pode ser um campo vazio`,
            'any.required': `Uma matéria é um campo obrigatório`,
          }),
        )
        .unique()
        .required()
        .messages({
          'array.base': `Matérias deveria ser um tipo de array`,
          'array.empty': `Matérias não pode ser um campo vazio`,
          'array.unique': `Matérias são únicas`,
          'any.required': `Matérias é um campo obrigatório`,
        }),
      parent_name: Joi.string().required().messages({
        'string.base': `"Nome do responsável" deveria ser do tipo texto`,
        'string.empty': `"Nome do responsável" não pode ser vazio`,
        'any.required': `"Nome do responsável" é obrigatório`,
      }),
      parent_cpf: Joi.string().min(11).required().messages({
        'string.base': `"CPF do responsável" deveria ser do tipo texto`,
        'string.empty': `"CPF do responsável" não pode ser vazio`,
        'string.min': `"CPF do responsável" deve ter no mínimo 11 dígitos`,
        'any.required': `"CPF do responsável" é obrigatório`,
      }),
      parent_whatsapp: Joi.string().min(8).required().messages({
        'string.base': `"WhatsApp do responsável" deveria ser do tipo texto`,
        'string.empty': `"WhatsApp do responsável" não pode ser vazio`,
        'string.min': `"WhatsApp do responsável" deve ter no mínimo 8 dígitos`,
        'any.required': `"WhatsApp do responsável" é obrigatório`,
      }),
      parent_gender: Joi.string().required().messages({
        'string.base': `"Gênero do responsável" deveria ser do tipo texto`,
        'string.empty': `"Gênero do responsável" não pode ser vazio`,
        'any.required': `"Gênero do responsável" é obrigatório`,
      }),
      address_zipcode: Joi.string().min(8).required().messages({
        'string.base': `"CEP" deveria ser do tipo texto`,
        'string.empty': `"CEP" não pode ser vazio`,
        'string.min': `"CEP" deve ter no mínimo 8 dígitos`,
        'any.required': `"CEP" é obrigatório`,
      }),
      address_state: Joi.string().required().messages({
        'string.base': `"Estado" deveria ser do tipo texto`,
        'string.empty': `"Estado" não pode ser vazio`,
        'any.required': `"Estado" é obrigatório`,
      }),
      address_city: Joi.string().required().messages({
        'string.base': `"Cidade" deveria ser do tipo texto`,
        'string.empty': `"Cidade" não pode ser vazio`,
        'any.required': `"Cidade" é obrigatório`,
      }),
      address_neighborhood: Joi.string().required().messages({
        'string.base': `"Bairro" deveria ser do tipo texto`,
        'string.empty': `"Bairro" não pode ser vazio`,
        'any.required': `"Bairro" é obrigatório`,
      }),
      address_street: Joi.string().required().messages({
        'string.base': `"Rua" deveria ser do tipo texto`,
        'string.empty': `"Rua" não pode ser vazio`,
        'any.required': `"Rua" é obrigatório`,
      }),
      address_houseNumber: Joi.string().required().messages({
        'string.base': `"Número da casa" deveria ser do tipo texto`,
        'string.empty': `"Número da casa" não pode ser vazio`,
        'any.required': `"Número da casa" é obrigatório`,
      }),
      address_complement: Joi.string().allow('').messages({
        'string.base': `"Complemento" deveria ser do tipo texto`,
        'string.empty': `"Complemento" não pode ser vazio`,
      }),
      paymentDay: Joi.number().min(1).max(31).messages({
        'number.base': `"Dia de pagamento" deveria ser do tipo número`,
        'number.min': `"Dia de pagamento" deve ser no mínimo 1`,
        'number.max': `"Dia de pagamento" deve ser no máximo 31`,
        'number.empty': `"Dia de pagamento" não pode ser vazio`,
      }),
      monthly_cost: Joi.number().min(1).messages({
        'number.base': `"Valor da mensalidade" deveria ser do tipo número`,
        'number.min': `"Valor da mensalidade" deve ser no mínimo 1`,
        'number.empty': `"Valor da mensalidade" não pode ser vazio`,
      }),
      tolerance: Joi.number().min(1).max(31).messages({
        'number.base': `"Tolerância" deveria ser do tipo número`,
        'number.min': `"Tolerância" deve ser no mínimo 1`,
        'number.max': `"Tolerância" deve ser no máximo 31`,
        'number.empty': `"Tolerância" não pode ser vazio`,
      }),
      recurrence: Joi.array()
        .items(
          Joi.number().messages({
            'string.base': `Um dia da semana deveria ser um tipo de texto`,
            'string.empty': `Um dia da semana não pode ser um campo vazio`,
          }),
        )
        .unique()
        .messages({
          'array.base': `Recorrência deveria ser um tipo de array`,
          'array.empty': `Recorrência não pode ser um campo vazio`,
          'array.unique': `Recorrência são únicas`,
        }),
      isActive: Joi.boolean().required().messages({
        'boolean.base': `"Está ativo" deveria ser do tipo booleano`,
        'boolean.empty': `"Está ativo" não pode ser vazio`,
        'any.required': `"Está ativo" é obrigatório`,
      }),
      isCompliant: Joi.boolean().required().messages({
        'boolean.base': `"Está adimplente" deveria ser do tipo booleano`,
        'boolean.empty': `"Está adimplente" não pode ser vazio`,
        'any.required': `"Está adimplente" é obrigatório`,
      }),
      note: Joi.string().allow('').messages({
        'string.base': `"Observação" deveria ser do tipo texto`,
        'string.empty': `"Observação" não pode ser vazio`,
      }),
      startDatePayment: Joi.string().required().messages({
        'date.base': `"Data do primeiro pagamento" deveria ser do tipo texto`,
        'date.empty': `"Data do primeiro pagamento" não pode ser vazio`,
        'any.required': `"Data do primeiro pagamento" é obrigatório`,
      }),
    }),
  };

  authenticateUserSchema = {
    body: Joi.object().keys({
      email: Joi.string().email().required().messages({
        'string.base': `"Email" deveria ser do tipo texto`,
        'string.empty': `"Email" não pode ser vazio`,
        'string.email': `"Email" não é um e-mail válido`,
        'any.required': `"Email" é obrigatório`,
      }),
      password: Joi.string().min(6).required().messages({
        'string.base': `"Senha" deveria ser do tipo texto`,
        'string.empty': `"Senha" não pode ser vazio`,
        'string.min': `"Senha" deve ter no mínimo 6 dígitos`,
        'any.required': `"Senha" é obrigatório`,
      }),
    }),
  };

  confirmPaymentSchema = {
    body: Joi.object().keys({
      payment_type: Joi.string().required().messages({
        'string.base': `"Tipo de pagamento" deveria ser do tipo texto`,
        'string.empty': `"Tipo de pagamento" não pode ser vazio`,
        'any.required': `"Tipo de pagamento" é obrigatório`,
      }),
      payment_id: Joi.number().messages({
        'number.base': `"ID do pagamento" deveria ser do tipo número`,
        'number.empty': `"ID do pagamento" não pode ser vazio`,
      }),
      amount: Joi.number().required().messages({
        'number.base': `"Quantia" deveria ser do tipo número`,
        'number.empty': `"Quantia" não pode ser vazio`,
        'any.required': `"Quantia" é obrigatório`,
      }),
      date: Joi.string().required().messages({
        'string.base': `"Data" deveria ser do tipo texto`,
        'string.empty': `"Data" não pode ser vazio`,
        'any.required': `"Data" é obrigatório`,
      }),
      receipt_url: Joi.string().uri().messages({
        'string.base': `"URL do comprovante" deveria ser do tipo texto`,
        'string.empty': `"URL do comprovante" não pode ser vazio`,
        'string.uri': `"URL do comprovante" não é uma URL válida`,
      }),
    }),
  };

  searchUserSchema = {
    query: Joi.object().keys({
      name: Joi.string().messages({
        'string.base': `"Email" deveria ser do tipo texto`,
        'string.empty': `"Email" não pode ser vazio`,
      }),
      registration: Joi.string().messages({
        'string.base': `"Matricula" deveria ser do tipo texto`,
        'string.empty': `"Matricula" não pode ser vazio`,
      }),
      isActive: Joi.boolean().messages({
        'boolean.base': `"Está ativo" deveria ser do tipo booleano`,
        'boolean.empty': `"Está ativo" não pode ser vazio`,
      }),
      isCompliant: Joi.boolean().messages({
        'boolean.base': `"Está adimplente" deveria ser do tipo booleano`,
        'boolean.empty': `"Está adimplente" não pode ser vazio`,
      }),
      user_type: Joi.string().messages({
        'string.base': `"Tipo de usuário" deveria ser do tipo texto`,
        'string.empty': `"Tipo de usuário" não pode ser vazio`,
      }),
      id: Joi.number().messages({
        'number.base': `"ID" deveria ser do tipo número`,
        'number.empty': `"ID" não pode ser vazio`,
      }),
    }),
  };

  updateUserSchema = {
    body: Joi.object().keys({
      id: Joi.number(),
      email: Joi.string().email().messages({
        'string.base': `"Email" deveria ser do tipo texto`,
        'string.empty': `"Email" não pode ser vazio`,
        'string.email': `"Email" não é um e-mail válido`,
      }),
      password: Joi.string().min(6).messages({
        'string.base': `"Senha" deveria ser do tipo texto`,
        'string.empty': `"Senha" não pode ser vazio`,
        'string.min': `"Senha" deve ter no mínimo 6 dígitos`,
      }),
      name: Joi.string().messages({
        'string.base': `"Nome" deveria ser do tipo texto`,
        'string.empty': `"Nome" não pode ser vazio`,
      }),
      phone: Joi.string().min(8).messages({
        'string.base': `"Telefone" deveria ser do tipo texto`,
        'string.min': `"Telefone" deve ter no mínimo 8 dígitos`,
        'string.empty': `"Telefone" não pode ser vazio`,
      }),
      gender: Joi.string().messages({
        'string.base': `"Gênero" deveria ser do tipo texto`,
        'string.empty': `"Gênero" não pode ser vazio`,
      }),
      user_type: Joi.string().messages({
        'string.base': `"Tipo de usuário" deveria ser do tipo texto`,
        'string.empty': `"Tipo de usuário" não pode ser vazio`,
      }),
      birthDate: Joi.string().messages({
        'date.base': `"Data de nascimento" deveria ser do tipo texto`,
        'date.empty': `"Data de nascimento" não pode ser vazio`,
      }),
      registration: Joi.string().messages({
        'string.base': `"Matrícula" deveria ser do tipo texto`,
        'string.empty': `"Matrícula" não pode ser vazio`,
      }),
      subjects: Joi.array()
        .items(
          Joi.string().messages({
            'string.base': `Uma matéria deveria ser um tipo de texto`,
            'string.empty': `Uma matéria não pode ser um campo vazio`,
          }),
        )
        .unique()
        .messages({
          'array.base': `Matérias deveria ser um tipo de array`,
          'array.empty': `Matérias não pode ser um campo vazio`,
          'array.unique': `Matérias são únicas`,
        }),
      parent_name: Joi.string().messages({
        'string.base': `"Nome do responsável" deveria ser do tipo texto`,
        'string.empty': `"Nome do responsável" não pode ser vazio`,
      }),
      parent_cpf: Joi.string().min(11).messages({
        'string.base': `"CPF do responsável" deveria ser do tipo texto`,
        'string.empty': `"CPF do responsável" não pode ser vazio`,
        'string.min': `"CPF do responsável" deve ter no mínimo 11 dígitos`,
        'any.required': `"CPF do responsável" é obrigatório`,
      }),
      parent_whatsapp: Joi.string().min(8).messages({
        'string.base': `"WhatsApp do responsável" deveria ser do tipo texto`,
        'string.empty': `"WhatsApp do responsável" não pode ser vazio`,
        'string.min': `"WhatsApp do responsável" deve ter no mínimo 8 dígitos`,
      }),
      parent_gender: Joi.string().messages({
        'string.base': `"Gênero do responsável" deveria ser do tipo texto`,
        'string.empty': `"Gênero do responsável" não pode ser vazio`,
      }),
      address_zipcode: Joi.string().min(8).messages({
        'string.base': `"CEP" deveria ser do tipo texto`,
        'string.empty': `"CEP" não pode ser vazio`,
        'string.min': `"CEP" deve ter no mínimo 8 dígitos`,
      }),
      address_state: Joi.string().messages({
        'string.base': `"Estado" deveria ser do tipo texto`,
        'string.empty': `"Estado" não pode ser vazio`,
      }),
      address_city: Joi.string().messages({
        'string.base': `"Cidade" deveria ser do tipo texto`,
        'string.empty': `"Cidade" não pode ser vazio`,
      }),
      address_neighborhood: Joi.string().messages({
        'string.base': `"Bairro" deveria ser do tipo texto`,
        'string.empty': `"Bairro" não pode ser vazio`,
      }),
      address_street: Joi.string().messages({
        'string.base': `"Rua" deveria ser do tipo texto`,
        'string.empty': `"Rua" não pode ser vazio`,
      }),
      address_houseNumber: Joi.string().messages({
        'string.base': `"Número da casa" deveria ser do tipo texto`,
        'string.empty': `"Número da casa" não pode ser vazio`,
      }),
      address_complement: Joi.string().allow('').messages({
        'string.base': `"Complemento" deveria ser do tipo texto`,
        'string.empty': `"Complemento" não pode ser vazio`,
      }),
      paymentDay: Joi.number().min(1).max(31).messages({
        'number.base': `"Dia de pagamento" deveria ser do tipo número`,
        'number.min': `"Dia de pagamento" deve ser no mínimo 1`,
        'number.max': `"Dia de pagamento" deve ser no máximo 31`,
        'number.empty': `"Dia de pagamento" não pode ser vazio`,
      }),
      monthly_cost: Joi.number().min(1).messages({
        'number.base': `"Valor da mensalidade" deveria ser do tipo número`,
        'number.min': `"Valor da mensalidade" deve ser no mínimo 1`,
        'number.empty': `"Valor da mensalidade" não pode ser vazio`,
      }),
      tolerance: Joi.number().min(1).max(31).messages({
        'number.base': `"Tolerância" deveria ser do tipo número`,
        'number.min': `"Tolerância" deve ser no mínimo 1`,
        'number.max': `"Tolerância" deve ser no máximo 31`,
        'number.empty': `"Tolerância" não pode ser vazio`,
      }),
      recurrence: Joi.array()
        .items(
          Joi.number().messages({
            'string.base': `Um dia da semana deveria ser um tipo de texto`,
            'string.empty': `Um dia da semana não pode ser um campo vazio`,
          }),
        )
        .unique()
        .messages({
          'array.base': `Recorrência deveria ser um tipo de array`,
          'array.empty': `Recorrência não pode ser um campo vazio`,
          'array.unique': `Recorrência são únicas`,
        }),
      isActive: Joi.boolean().messages({
        'boolean.base': `"Está ativo" deveria ser do tipo booleano`,
        'boolean.empty': `"Está ativo" não pode ser vazio`,
      }),
      isCompliant: Joi.boolean().messages({
        'boolean.base': `"Está adimplente" deveria ser do tipo booleano`,
        'boolean.empty': `"Está adimplente" não pode ser vazio`,
      }),
      note: Joi.string().allow('').messages({
        'string.base': `"Observação" deveria ser do tipo texto`,
        'string.empty': `"Observação" não pode ser vazio`,
      }),
      startDatePayment: Joi.string().messages({
        'date.base': `"Data do primeiro pagamento" deveria ser do tipo texto`,
        'date.empty': `"Data do primeiro pagamento" não pode ser vazio`,
      }),
      createdAt: Joi.string(),
      updatedAt: Joi.string(),
    }),
  };

  createPaymentSchema = {
    body: Joi.object().keys({
      user_id: Joi.number().required().messages({
        'number.base': `"ID do usuário" deveria ser do tipo número`,
        'number.empty': `"ID do usuário" não pode ser vazio`,
        'any.required': `"ID do usuário" é obrigatório`,
      }),
      payment_type: Joi.string().required().messages({
        'string.base': `"Tipo de pagamento" deveria ser do tipo texto`,
        'string.empty': `"Tipo de pagamento" não pode ser vazio`,
        'any.required': `"Tipo de pagamento" é obrigatório`,
      }),
      amount: Joi.number().required().messages({
        'number.base': `"Quantia" deveria ser do tipo número`,
        'number.empty': `"Quantia" não pode ser vazio`,
        'any.required': `"Quantia" é obrigatório`,
      }),
      date: Joi.string().required().messages({
        'string.base': `"Data" deveria ser do tipo texto`,
        'string.empty': `"Data" não pode ser vazio`,
        'any.required': `"Data" é obrigatório`,
      }),
      receipt_url: Joi.string().uri().messages({
        'string.base': `"URL do comprovante" deveria ser do tipo texto`,
        'string.empty': `"URL do comprovante" não pode ser vazio`,
        'string.uri': `"URL do comprovante" não é uma URL válida`,
      }),
      isPaid: Joi.boolean().required().messages({
        'boolean.base': `"Está pago" deveria ser do tipo booleano`,
        'boolean.empty': `"Está pago" não pode ser vazio`,
        'any.required': `"Está pago" é obrigatório`,
      }),
    }),
  };

  searchPaymentSchema = {
    query: Joi.object().keys({
      id: Joi.number().messages({
        'number.base': `"ID" deveria ser do tipo número`,
        'number.empty': `"ID" não pode ser vazio`,
      }),
      user_id: Joi.number().messages({
        'number.base': `"ID do usuário" deveria ser do tipo número`,
        'number.empty': `"ID do usuário" não pode ser vazio`,
      }),
    }),
  };

  updatePaymentSchema = {
    body: Joi.object().keys({
      id: Joi.number(),
      user_id: Joi.number().messages({
        'number.base': `"ID do usuário" deveria ser do tipo número`,
        'number.empty': `"ID do usuário" não pode ser vazio`,
      }),
      payment_type: Joi.string().messages({
        'string.base': `"Tipo de pagamento" deveria ser do tipo texto`,
        'string.empty': `"Tipo de pagamento" não pode ser vazio`,
      }),
      amount: Joi.number().messages({
        'number.base': `"Quantia" deveria ser do tipo número`,
        'number.empty': `"Quantia" não pode ser vazio`,
      }),
      date: Joi.string().messages({
        'string.base': `"Data" deveria ser do tipo texto`,
        'string.empty': `"Data" não pode ser vazio`,
      }),
      receipt_url: Joi.string().uri().messages({
        'string.base': `"URL do comprovante" deveria ser do tipo texto`,
        'string.empty': `"URL do comprovante" não pode ser vazio`,
        'string.uri': `"URL do comprovante" não é uma URL válida`,
      }),
      isPaid: Joi.boolean().messages({
        'boolean.base': `"Está pago" deveria ser do tipo booleano`,
        'boolean.empty': `"Está pago" não pode ser vazio`,
      }),
      createdAt: Joi.string(),
      updatedAt: Joi.string(),
    }),
  };

  searchFileSchema = {
    query: Joi.object().keys({
      url: Joi.string().uri().messages({
        'string.base': `"URL" deveria ser do tipo texto`,
        'string.empty': `"URL" não pode ser vazio`,
        'string.uri': `"URL" não é uma URL válida`,
      }),
    }),
  };
}

export default new Schemas();
