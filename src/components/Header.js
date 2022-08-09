import React from 'react';
import Auth from '../authentication/auth'
import Modal from 'react-modal';
import '../css/Product.css';
import Basket from './Basket';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Header(props) {
  const { cartItems, onAdd, onRemove } = props;
  console.log(cartItems);
  let token = Auth.getToken();

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <header className="block row center">
      <div>
        <a href="/">
          <h1>Ekinoks Shopping</h1>
        </a>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Cart</h2>
          <div >
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
            ></Basket>
          </div>
          <button onClick={closeModal}>Close</button>
        </Modal>
        <button href="/Cart" onClick={openModal}>
          Cart{' '}
          {props.countCartItems ? (
            <button className="badge">
              {props.countCartItems}
            </button>
          ) : (
            ''
          )}
        </button>{' '}
        <div>
          {token ?
            <div>Logged In</div> :
            <a href="/Login">Log In</a>
          }
        </div>
      </div>
    </header>

  );
}