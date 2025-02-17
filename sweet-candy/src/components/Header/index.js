import styles from './Header.module.css';
import Image from 'next/image';

export default function Header(){
    return(
    <header className={styles.header}>
        <Image className={styles.logo} src='/Image/logosweetcandy.png' width={100} height={100} alt="Logo Sweet Candy" />
        <p className={styles.cupcakeria} >Cupcakeria</p>
    </header>)
}