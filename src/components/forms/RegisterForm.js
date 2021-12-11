import { React, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as accountServices from '../../services/account-services';
import textFieldValidation from "../../validations/textfield-validation";
import emailValidation from "../../validations/email-validations";
import passwordValidation from "../../validations/password-validation";

export default function RegisterForm() {
    //criando uma varíaveis no state do componente utilizando REACT HOOKS
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    //função executada no SUBMIT do formlário
    //criando um formulário utilizando o REACT HOOK FORMS
    const {
        control, //capturar os campos do formuário
        handleSubmit, //capturar o evento SUBMIT do formulário
        formState: {
            errors // erros de validação do formulário
        },
        reset //limpar os campos do formulário
    } = useForm();
    const onSubmit = (data) => {
        //limpar as mensagens
        setMensagemSucesso('');
        setMensagemErro('');
        accountServices.postRegister(data)
            .then(
                result => {
                    // console.log(result);
                    setMensagemSucesso(result.message);
                    //limpar os campos do formulário
                    reset({
                        nome: '',
                        email: '',
                        senha: '',
                        senhaConfirmacao: ''
                    });
                }
            )
            .catch(
                e => {
                    setMensagemErro(e.response.data);
                }
            );
    }
    //renderizar o conteudo HTML do componente
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                mensagemSucesso && <div className="alert alert-success">
                    <strong>Sucesso! </strong> {mensagemSucesso}
                </div>
            }
            {
                mensagemErro && <div className="alert alert-danger">
                    <strong>Error! </strong> {mensagemErro}
                </div>
            }
            <div className="row mb-3">
                <div className="col-md-6">
                    <label>Nome do Usuário:</label>
                    <Controller
                        control={control}
                        name="nome"
                        defaultValue=""
                        rules={{ validate: textFieldValidation }}
                        render={
                            ({ field: { onChange, onBlur, value } }) => (
                                <input type="text"
                                    className="form-control"
                                    placeholder="Ex: joão Neto"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    value={value} />
                            )
                        }
                    />
                    {
                        errors.nome && <div className="text-danger">
                            {errors.nome.message}
                        </div>
                    }
                </div>
                <div className="col-md-6">
                    <label>Email do Usuário:</label>
                    <Controller
                        control={control}
                        name="email"
                        rules={{ validate: emailValidation }}
                        defaultValue=""
                        render={
                            ({ field: { onChange, onBlur, value } }) => (
                                <input type="email"
                                    className="form-control"
                                    placeholder="Ex: joaofirmino6@gmail.com"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    value={value} />
                            )
                        }
                    />
                    {
                        errors.email && <div className="text-danger">
                            {errors.email.message}
                        </div>
                    }
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label>Senha de Acessso</label>
                    <Controller
                        control={control}
                        rules={{ validate: passwordValidation }}
                        name="senha"
                        defaultValue=""
                        render={
                            ({ field: { onChange, onBlur, value } }) => (
                                <input type="password"
                                    className="form-control"
                                    placeholder="digite a sua senha"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    value={value} />
                            )
                        }
                    />
                    {
                        errors.senha && <div className="text-danger">
                            {errors.senha.message}
                        </div>
                    }
                </div>
                <div className="col-md-6">
                    <label>Confirme a sua Senha</label>
                    <Controller
                        control={control}
                        rules={{ validate: passwordValidation }}
                        name="senhaConfirmacao"
                        defaultValue=""
                        render={
                            ({ field: { onChange, onBlur, value } }) => (
                                <input type="password"
                                    className="form-control"
                                    placeholder="Confirme a sua senha"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    value={value} />
                            )
                        }
                    />
                    {
                        errors.senhaConfirmacao && <div className="text-danger">
                            {errors.senhaConfirmacao.message}
                        </div>
                    }
                </div>
            </div>
            <div className="row mb-3">
                <div className='col-md-12'>
                    <input type="submit" value="Realizar Cadastro"
                        className='btn btn-success' />
                </div>

            </div>
        </form>
    )
}