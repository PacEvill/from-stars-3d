import { NextPage } from 'next';

const VerifyRequestPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Verifique seu e-mail</h1>
        <p className="text-center">Enviamos um link de verificação para o seu endereço de e-mail.</p>
        <p className="text-center">Por favor, verifique sua caixa de entrada e clique no link para concluir o login.</p>
      </div>
    </div>
  );
};

export default VerifyRequestPage;