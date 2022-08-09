import React from 'react';
import Modal from 'react-modal';
import '../css/Product.css';

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

export default function Product(props) {

  const { product, onAdd } = props;
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
    <>

      <div className="card">
        <div onClick={openModal}>
          <img src={product.image} alt={product.title} />
        </div>
        <div key={product.id}>
          <div id="content">
            <h3>{product.title}</h3>
            <div>${product.price}</div>
          </div>
          <div className="add">
            <button onClick={() => onAdd(product)}>Add To Cart</button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Product Detail</h2>
        <br></br>
        <div className='product-detail'>
          <div className='row'>
            <img src={product.image} alt={product.title} />
            <div key={product.id}>
              <div id="content">
                <div className='product-detail-title'>
                  <div className='title'><h3>{product.title}</h3></div>
                  <div className='description'><h5>{product.description}</h5></div>
                  <div className='category'><h6>Category : {product.category}</h6></div>
                  <div className='rating'><h6>Rating : {product.rating.rate} / 5.0</h6></div>
                  <div className='count'><h6>Count : {product.rating.count}</h6></div>
                  <div className='price'><h1>${product.price}</h1></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className='add'>
          <div className='row'>
            <button onClick={closeModal}>Close</button>
            <button onClick={() => onAdd(product)}>Add To Cart</button>
          </div>
        </div>
      </Modal>
    </>
  )
}