import React from 'react';
import LoginForm from '../components/forms/LoginForm';
 
const LoginPage = () => (
    <div className="row">
        <div className="col-md-4 offset-md-4">
            <div className="card">
                <div className="card-body">
                    <div className="text-center">
                        <img src="https://www.cotiinformatica.com.br/imagens/logo-coti-informatica.png"
                            className='img-fluid' alt='' />
                        <h5 className="card-title">Acessar conta</h5>
                        <p className="card-text">Informe suas credenciais de acesso para entrar no sistema.</p>
                        <LoginForm />

                        </div>
                </div>
            </div>
        </div>
    </div>
)
 
export default LoginPage;

