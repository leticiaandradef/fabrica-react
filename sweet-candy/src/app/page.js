'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const Checkout = () => {
  const [pagamento, setPagamento] = useState('');
  const [resumo, setResumo] = useState(null);
  const [carregandoCep, setCarregandoCep] = useState(false);

  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    cep: '',
    bairro: '',
    complemento: '',
  });

  const fetchCepData = async (cepNumerico) => {
    try {
      setCarregandoCep(true);
      const response = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado. Confere aí e tenta de novo 😉');
        return;
      }

      setEndereco((prev) => ({
        ...prev,
        rua: data.logradouro || '',
        bairro: data.bairro || '',
      }));
    } catch (err) {
      console.error('Erro ao buscar CEP:', err);
      alert('Não rolou buscar o CEP. Tenta mais tarde.');
    } finally {
      setCarregandoCep(false);
    }
  };

  const fetchResumo = async (clienteId) => {
    try {
      const res = await fetch(`https://apisweetcandy.dev.vilhena.ifro.edu.br/resumo/${clienteId}`);
      const data = await res.json();
      if (res.ok) setResumo(data);
      else setResumo(null);
    } catch (err) {
      console.error('Erro ao obter resumo:', err);
      setResumo(null);
    }
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    let novoValor = value;

    if (name === 'numero') novoValor = value.replace(/\D/g, '');

    if (name === 'cep') {
      novoValor = value
        .replace(/\D/g, '')
        .slice(0, 8)
        .replace(/^(\d{5})(\d{0,3})$/, '$1-$2');

      const cepNums = novoValor.replace(/\D/g, '');
      if (cepNums.length === 8) fetchCepData(cepNums);
    }

    setEndereco((prev) => ({ ...prev, [name]: novoValor }));
  };

  const handleLimparPedido = async () => {
    const clienteId = localStorage.getItem('clienteId');
    if (!clienteId) return alert('ID do cliente não encontrado. Faz login de novo.');

    try {
      const res = await fetch(
        `https://apisweetcandy.dev.vilhena.ifro.edu.br/pedidos/aguardando/${clienteId}`,
        { method: 'DELETE' }
      );
      const data = await res.json();
      if (res.ok) {
        alert(data.mensagem || 'Pedido limpo com sucesso!');
        await fetchResumo(clienteId);
      } else alert(data.erro || 'Erro ao limpar pedido.');
    } catch (err) {
      alert('Erro ao conectar com a API: ' + err);
    }
  };

  const handleFazerPedido = async () => {
    if (!resumo || resumo.quantidade === 0)
      return alert('Monte pelo menos 1 cupcake antes de finalizar.');
    if (!pagamento) return alert('Seleciona a forma de pagamento, migo.');

    const { rua, numero, cep, bairro } = endereco;
    if (!rua || !numero || !cep || !bairro)
      return alert('Preenche tudo no endereço ‑ não deixa nada em branco!');

    const clienteId = localStorage.getItem('clienteId');
    if (!clienteId) return alert('ID do cliente não encontrado. Faz login de novo.');

    try {
      const res = await fetch('https://apisweetcandy.dev.vilhena.ifro.edu.br/endereco', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_cliente: clienteId, ...endereco }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.erro || 'Erro ao salvar endereço.');
    } catch (err) {
      return alert('Erro ao conectar com a API de endereço: ' + err);
    }

    window.location.href = '/vendaCupcake';
  };

  useEffect(() => {
    const clienteId = localStorage.getItem('clienteId');
    if (clienteId) fetchResumo(clienteId);
    else alert('ID do cliente não encontrado. Faz login de novo.');
  }, []);

  return (
    <div>
      <Header />

      <div className={styles.container}>
        <h1 className={styles.h1}>Checkout</h1>

        <h2 className={styles.h2}>Formas de Pagamento</h2>
        <div className={styles.pagamentos}>
          {['pix', 'maquina', 'dinheiro'].map((tipo) => (
            <label key={tipo} className={styles.label}>
              <input
                type="radio"
                name="pagamento"
                className={styles.input}
                checked={pagamento === tipo}
                onChange={() => setPagamento(tipo)}
              />
              {tipo === 'pix' ? 'Pix' : tipo === 'maquina' ? 'Máquina móvel' : 'Dinheiro'}
            </label>
          ))}
        </div>

        <h3 className={styles.h3}>Endereço de entrega</h3>
        <div className={styles.bloco}>
          <p className={`${styles.p} ${styles.fullRow}`}>
            <span className={styles.fixo}>Rua:</span>
            <input
              readOnly
              name="rua"
              value={endereco.rua}
              onChange={handleEnderecoChange}
              className={styles.inputTexto}
              placeholder="Rua"
            />
          </p>

          <p className={styles.p}>
            <span className={styles.fixo}>Número:</span>
            <input
              name="numero"
              inputMode="numeric"
              value={endereco.numero}
              onChange={handleEnderecoChange}
              className={styles.inputTexto}
              placeholder="Número"
            />
          </p>

          <p className={styles.p}>
            <span className={styles.fixo}>CEP:</span>
            <input
              name="cep"
              value={endereco.cep}
              onChange={handleEnderecoChange}
              className={styles.inputTexto}
              placeholder="CEP (ex: 12345-678)"
            />
            {carregandoCep && <span className={styles.loading}>Buscando CEP…</span>}
          </p>

          <p className={styles.p}>
            <span className={styles.fixo}>Bairro:</span>
            <input
              readOnly
              name="bairro"
              value={endereco.bairro}
              onChange={handleEnderecoChange}
              className={styles.inputTexto}
              placeholder="Bairro"
            />
          </p>

          <p className={styles.p}>
            <span className={styles.fixo}>Complemento:</span>
            <input
              name="complemento"
              value={endereco.complemento}
              onChange={handleEnderecoChange}
              className={styles.inputTexto}
              placeholder="Complemento (opcional)"
            />
          </p>
        </div>

        <h3 className={styles.resumotitle}>Resumo do pedido</h3>
        <div className={styles.blocoresumo}>
          <p className={styles.p}>
            <span className={styles.fixo}>Quantidade:</span>{' '}
            <span>{resumo ? resumo.quantidade : 'Carregando…'}</span>
          </p>
          <p className={styles.p}>
            <span className={styles.fixo}>Taxa de serviço:</span>{' '}
            <span>{resumo ? `R$ ${resumo.taxaServico.toFixed(2)}` : 'Carregando…'}</span>
          </p>
          <p className={styles.p}>
            <span className={styles.fixo}>Taxa de entrega:</span>{' '}
            <span>{resumo ? `R$ ${resumo.taxaEntrega.toFixed(2)}` : 'Carregando…'}</span>
          </p>
          <p className={styles.p}>
            <span className={styles.fixo}>Total:</span>{' '}
            <span>{resumo ? `R$ ${resumo.total.toFixed(2)}` : 'Carregando…'}</span>
          </p>
        </div>

        <div className={styles.botoes}>
          <button type="button" className={styles.button} onClick={handleLimparPedido}>
            Limpar pedido
          </button>
          <button type="button" className={styles.button} onClick={handleFazerPedido}>
            Fazer pedido
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
