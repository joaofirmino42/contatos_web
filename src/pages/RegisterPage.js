import React from "react";
import RegisterForm from "../components/forms/RegisterForm";

const RegisterPage = () =>
(
    <div className="row">
        <div className="col-md-8 offset-md-2">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Criar conta de usuário</h5>
                    <p className="card-text">Preencha os campos abaixo para criar a conta de acesso</p>
                    <RegisterForm />
                </div>
            </div>
        </div>
    </div>

)
export default RegisterPage;