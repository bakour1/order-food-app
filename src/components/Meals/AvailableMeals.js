import React, { useCallback, useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';

const AvailableMeals = () => {

  const [ meals, setMeals ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState( false );
  const [ hasError, setHasError ] = useState( null );

  const fetchMeals = useCallback( async () => {

    setIsLoading( true );
    setHasError( null );
    try {
      const response = await fetch( 'https://react-movies-38d33-default-rtdb.firebaseio.com/meals.json' );
      if ( !response.ok ) {
        throw new Error( 'some thing wrong fetching' );
      }
      const data = await response.json();


      let LOADED_MEALS = [];

      for ( const key in data ) {
        LOADED_MEALS.push( {
          id: key,
          name: data[ key ].name,
          description: data[ key ].description,
          price: data[ key ].price,
        } );
      }

      setMeals( LOADED_MEALS );
      setIsLoading( false );
    } catch ( error ) {
      setHasError( error.message );
      setIsLoading( false );
    }
  }, [] );

  useEffect( () => {
    fetchMeals();
  }, [ fetchMeals ] );

  if ( isLoading ) {
    return <section className={ classes.loader }>
      <p>loading...</p>
    </section>;
  }
  if ( hasError ) {
    return <section className={ classes.error }>
      <p>{ hasError }</p>
    </section>;
  }

  const mealList = <ul className={ classes.ul }>{
    meals.map( meal =>
      <MealItem
        id={ meal.id } // this is new!
        key={ meal.id }
        name={ meal.name }
        description={ meal.description }
        price={ meal.price }
      />
    )
  }</ul>;

  return (
    <section className={ classes.meals }>
      <Card>
        { mealList }
      </Card>
    </section>
  );
};

export default AvailableMeals;

