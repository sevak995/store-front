import React, { useState, useEffect } from 'react';
import LayoutApp from '../../components/Layout';
import { Row, Col } from 'antd';
import Product from '../../components/Product';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../../redux/cartItemsSlice';
import { useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const { productData } = useSelector((state) => state.cartItems);

  const [selectedCategory, setSelectedCategory] = useState('Fiction');
  const categories = [
    {
      name: 'Fiction',
      imageUrl:
        'https://previews.123rf.com/images/tartila/tartila1810/tartila181000142/109751762-isometric-book-icon-stack-of-books-textbook-pile-academic-reading-wisdom-dictionary-glossary-and-sch.jpg',
    },
    {
      name: 'Historical',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/1800/1800196.png',
    },
    {
      name: 'Dictionaries',
      imageUrl:
        'https://thumbs.dreamstime.com/b/book-dictionary-icon-flat-style-isolated-white-background-training-symbol-vector-illustration-79587766.jpg',
    },
  ];

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <LayoutApp>
      <div className="category">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`categoryFlex ${
              selectedCategory === category.name && 'category-active'
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <h3 className="categoryName">{category.name}</h3>
            <img
              src={category.imageUrl}
              alt={category.name}
              height={60}
              width={60}
            />
          </div>
        ))}
      </div>
      <Row>
        {productData
          .filter((i) => i.category === selectedCategory)
          .map((product) => (
            <Col xs={24} sm={6} md={12} lg={6} key={product.name}>
              <Product product={product} key={product.name} />
            </Col>
          ))}
      </Row>
    </LayoutApp>
  );
};

export default Home;
