import React, { useState } from 'react';
import './styles.css';

const Checkout = () => {
  const [pagamento, setPagamento] = useState('');

  const handleLimparCarrinho = async () => {
    // Simula chamada API
    await fetch('/api/limpar-carrinho', { method: 'POST' });
    alert('Carrinho limpo!');
  };

  const handleVoltar = () => {
    // Simula navegação
    alert('Voltando...');
  };

  const handleFazerPedido = async () => {
    await fetch('/api/fazer-pedido', { method: 'POST' });
    alert('Pedido feito com sucesso!');
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <h2>Formas de Pagamento</h2>
      <div className="pagamentos">
        <label><input type="radio" name="pagamento" onChange={() => setPagamento('pix')} /> Pix no app</label>
        <label><input type="radio" name="pagamento" onChange={() => setPagamento('credito')} /> Cartão de crédito no app</label>
        <label><input type="radio" name="pagamento" onChange={() => setPagamento('maquina')} /> Máquina móvel</label>
        <label><input type="radio" name="pagamento" onChange={() => setPagamento('dinheiro')} /> Dinheiro</label>
      </div>

      <h3>Endereço de entrega</h3>
      <div className="bloco">
        <p>
          Rua:<br />
          Número da casa:<br />
          CEP:<br />
          Bairro:<br />
          Complemento:
        </p>
      </div>

      <h3 className="resumo-title">Resumo da venda</h3>
      <div className="bloco resumo">
        <p>
          Quantidade:<br />
          Taxa de serviço:<br />
          Taxa de entrega:<br />
          Total:
        </p>
      </div>

      <div className="botoes">
        <button onClick={handleLimparCarrinho}>Limpar Carrinho</button>
        <button onClick={handleVoltar}>Voltar</button>
        <button onClick={handleFazerPedido}>Fazer pedido</button>
      </div>
    </div>
  );
};

export default Checkout;