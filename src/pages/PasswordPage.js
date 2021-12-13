import React from 'react';
import PasswordForm from '../components/forms/PasswordForm';

const PasswordPage = () => (
    <div className="row">
        <div className="col-md-4 offset-md-4">
            <div className="card">
                <div className="card-body">
                    <div className="text-center">
                        <h5 className="card-title">Esqueci minha senha</h5>
                        <p className="card-text">Informe seu email para gerar uma nova senha de acesso.</p>
                        <PasswordForm />
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default PasswordPage;
