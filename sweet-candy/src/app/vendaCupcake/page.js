import styles from './page.module.css'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Agradecimento() {
    return (
        <div>
            <Header /> 
            <div className={styles.caixa}>
                <div className={styles.mensagem}>
                <span className={styles.icone}>🧁</span>
                <p>Sua compra foi realizada com sucesso.</p>
            </div>
                <div className={styles.agradecimento}>
                    Obrigada pela preferência! 🎔
                </div>
                <Link className={styles.botao} href="#">Cadastrar Feedback</Link>
                <Link className={styles.botao} href="#">Solicitar devolução</Link>
                <Link className={styles.botao} href="#">Volatr ao início</Link>
            </div>
            <Footer /> 
        </div>
    )
}
