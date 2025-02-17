import styles from './page.module.css'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from 'next/link'

export default function VendaCupcake() {
    return (
        <div>
            <Header />
            <div className={styles.telafundo}>
            
                <div className={styles.container}>
                    <div className={styles.icon}>🧁</div>

                    <h1 className={styles.h1}>Sua compra foi realizada com sucesso!!</h1>
                </div>

                <div className={styles.container1}>
                    <p className={styles.p}>Obrigada pela preferência! <span>🖤</span></p>
                </div>

                <div className={styles.opc}>
                                    
                    <button className={styles.buttons}>
                        <Link className={styles.link} href="/cadastrarFeedback">Fazer feedback</Link>
                    </button>
                                    
                    <button className={styles.buttons}>
                        <Link className={styles.link} href="/solicitarDevolucao">solicitar Devolucao</Link>
                    </button>

                </div>
            </div>
            <Footer />
        </div>
    )
}