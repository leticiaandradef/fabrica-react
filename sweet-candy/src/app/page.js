"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Checkout() {
    
  const router = useRouter(); 


  const handleEntregaChange = (event) => {
    const value = event.target.value;
    if (value) {
      router.push(value);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.h1}>Checkout</h1>

        
        <div className={styles.section}>
          <h2 className={styles.h2}>Formas de Pagamento</h2>
          <div className={styles.option}>
            <input className={styles.input} type="radio" name="pagamento" value="credito" />
            <label className={styles.label}>Cartão de Crédito no App</label>
          </div>
          <div className={styles.option}>
            <input className={styles.input} type="radio" name="pagamento" value="dinheiro" />
            <label className={styles.label}>Dinheiro</label>
          </div>
          <div className={styles.option}>
            <input className={styles.input} type="radio" name="pagamento" value="maquina" />
            <label className={styles.label}>Máquina Móvel</label>
          </div>
          <div className={styles.option}>
            <input className={styles.input} type="radio" name="pagamento" value="pix" />
            <label className={styles.label}>PIX no App</label>
          </div>
        </div>

       
        <div className={styles.section}>
          <h2 className={styles.h2}>Formas de Entrega</h2>
          <div className={styles.option}>
            <input className={styles.input} type="radio" name="entrega" value="loja" />
            <label className={styles.label}>Retirada na Loja</label>
          </div>
          <div className={styles.option}>
            <input
              className={styles.input}
              type="radio"
              name="entrega"
              value="/endereco-de-entrega/index"
              onChange={handleEntregaChange}
            />
            <label className={styles.label}>Entrega (Delivery)</label>
          </div>
        </div>

   
        <div className={styles.resumo}>
          <h3 className={styles.h3}>Resumo do Pedido</h3>
          <p className={styles.p}>Produto: </p>
          <p className={styles.p}>Quantidade: 0</p>
          <p className={styles.p}>Taxa de serviço: R$ 00,00</p>
          <p className={styles.p}>Taxa de entrega: R$ 00,00</p>
          <p className={styles.p}>Total: R$ 00,00</p>
        </div>

      
        <div className={styles.buttons}>
          <button className={styles.button} type="reset">
            Limpar Carrinho
          </button>
          <button className={styles.button} onClick={() => router.push("/pedido")}>
            Voltar
          </button>
          <button className={styles.button} onClick={() => router.push("./vendaCupcake")}>
            Fazer Pedido
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
