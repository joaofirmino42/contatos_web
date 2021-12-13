import { React, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import emailValidation from "../../validations/email-validations";
import passwordValidation from "../../validations/password-validation";
import { NavLink } from "react-router-dom";
import * as accountservices from '../../services/account-services';
import * as authHelpers from '../../helpers/auth-helpers';
//declarando o componenete como Função

export default function LoginForm() {

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
        //  alert(JSON.stringify(data));
        //limpar as mensagens de sucesso e erro
        setMensagemSucesso('');
        setMensagemErro('');
        //fazendo a chamada para o serviço de autenticação da API
        accountservices.postLogin(data).then(
            result => {
                setMensagemSucesso(result.mensagem);
                //gravar os dados do usuario autenticado na 
                //local strage do navegador
                authHelpers.signIn(result);
                //limpar os campos do formulário
                reset({
                    email: '',
                    senha: ''
                })
            }
        )
            .catch(
                e => {
                    setMensagemErro(e.response.data);
                }
            )
    }

    //renderizar o conteudo HTML do componente
    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            {
                mensagemSucesso && <div className="alert alert-success">
                    <strong>Sucesso!</strong>{mensagemSucesso}
                </div>
            }
            {
                mensagemErro && <div className="alert alert-danger">
                    <strong>Erro!</strong>{mensagemErro}
                </div>
            }
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

            <div className="mb-3 text-start">
                <label>Senha de acesso:</label>
                <Controller
                    control={control}
                    name="senha"
                    defaultValue=""
                    rules={{ validate: passwordValidation }}
                    render={
                        ({ field: { onChange, onBlur, value } }) => (
                            <input
                                id="senha"
                                type="password"
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
                    errors.senha && <div className="text-danger">
                        {errors.senha.message}
                    </div>

                }
            </div>

            <div className="d-grid mb-1">
                <input type="submit" value="Acessar Sistema"
                    className="btn btn-primary" />
            </div>

            <div className="d-grid mb-1">
                <NavLink className="btn btn-secondary" to="/criar-conta">
                    Criar conta de usuário.
                </NavLink>
            </div>

            <div className="d-grid mb-1">
                <NavLink className="btn btn-light" to="/esqueci-minha-senha">
                    Esqueci minha senha?
                </NavLink>
            </div>

        </form>
    )

}

