import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getDrinks } from '../../services/fetchRecipes';
import './styles.css';

function Slide({ toggle, category }) {
  const [recomendations, setRecomendations] = useState([]);
  const fixedToggle = toggle === 'Meal' ? 'Drink' : 'Meal';
  const fixedCategory = category === 'strCategory' ? 'strAlcoholic' : 'strCategory';

  useEffect(() => {
    getDrinks().then((response) => {
      setRecomendations(response);
    });
  }, []);

  return (
    <div>
      <h2>Recomendadas</h2>
      <div>
        { recomendations.map((item, index) => (
          <Link
            key={ `Card-${index}` }
            to={ toggle === 'Meal'
              ? `/comidas/${item.idMeal}` : `/comidas/${item.idDrink}` }
          >
            <Card data-testid={ `${index}-recomendation-card` }>
              <Card.Img variant="top" src={ item[`str${fixedToggle}Thumb`] } />
              <Card.Body>
                <Card.Subtitle>{ item[fixedCategory] }</Card.Subtitle>
                <Card.Title>{ item[`str${fixedToggle}`] }</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

Slide.propTypes = {
  toggle: PropTypes.string,
  category: PropTypes.string,
}.isRequired;

export default Slide;
