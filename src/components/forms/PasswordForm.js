import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import emailValidation from "../../validations/email-validations";

//declarando o componente como função
export default function PasswordForm() {

    //atributos (variáveis)..
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');

    //função para criação do formulário
    //atraves do REACT HOOK FORM
    const {
        control, //captura dos campos do formulário
        handleSubmit, //capturar o evento SUBMIT do formulário
        formState: {
            errors //capturar os erros de validação dos campos
        },
        reset //limpar o conteudo dos campos
    } = useForm();

    //função para capturar o evento SUBMIT do formulário
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    }

    //renderizar o conteudo HTML do componente
    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

            <div className="mb-3 text-start">
                <label>Email de acesso:</label>
                <Controller
                    control={control}
                    name="email"
                    defaultValue=""
                    rules={{ validate: emailValidation }}
                    render={
                        ({ field: { onChange, onBlur, value } }) => (
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Digite aqui"
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                            />
                        )
                    }
                />
                {
                    errors.email && <div className="text-danger">
                        {errors.email.message}
                    </div>
                }
            </div>

            <div className="d-grid mb-1">
                <input type="submit" value="Confirmar"
                    className="btn btn-success" />
            </div>

            <div className="d-grid mb-1">
                <NavLink className="btn btn-primary" to="/">
                    Acessar conta.
                </NavLink>
            </div>

        </form>
    )
}


