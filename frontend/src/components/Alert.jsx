import '../styles/Alert.css';
import { useEffect } from 'react';

function Alert({mensagem, onClose}){
    //useEffect para controlar o tempo que o card fica na tela
    useEffect(() =>{
        if(mensagem){
            //define um timer de 5 segundos
            const timer = setTimeout(() =>{
                onClose();
            }, 5000);
            
            // caso o componente seja desfeito antes da hora limpa o timer
            return() => clearTimeout(timer);
        }
    }, [mensagem,onClose]);

    // caso nao haja mensagem o alerta nao é exibido
    if(!mensagem) return null;

    return(
        // caixa de alerta adaptada de https://uiverse.io/andrew-demchenk0/nervous-bear-89
        <div className="toast-container">
      <div className="info">
        <div className="info__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none">
            <path fill="#fff" d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z"></path>
          </svg>
        </div>
        
        {/* Aqui entra a mensagem dinâmica que você mandar */}
        <div className="info__title">{mensagem}</div>
        
        {/* O botão X agora tem um evento de clique para fechar manualmente antes do tempo */}
        <div className="info__close" onClick={onClose}>
          <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path fill="#fff" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"></path>
          </svg>
        </div>
      </div>
    </div>
    );
}

export default Alert;
