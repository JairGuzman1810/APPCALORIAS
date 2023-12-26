import AsyncStorage from '@react-native-async-storage/async-storage';
import {Meal} from '../types';

const MY_FOOD_KEY = '@MyFood:Key';

const useFoodStorage = () => {
  //Metodo para guardar la comida.
  const handleSaveFood = async ({calories, name, portion}: Meal) => {
    try {
      //Revisamos si algo esta almacenado.
      const currentSaveFood = await AsyncStorage.getItem(MY_FOOD_KEY);
      //Si es diferente a null, significa que hay algo guardado.
      if (currentSaveFood != null) {
        //Convertimos el string a JSON para hacer uso de la info
        const currentSavedFoodParsed = JSON.parse(currentSaveFood);
        //Se agrega la nueva información al JSON.
        currentSavedFoodParsed.push({
          calories,
          name,
          portion,
        });
        //Se guarda el nuevo JSON a la misma llave, pero se debio convertir en string antes.
        await AsyncStorage.setItem(
          MY_FOOD_KEY,
          JSON.stringify(currentSavedFoodParsed),
        );

        return Promise.resolve('Exito.');
      } else {
        //Si no hay nada, se crea uno nuevo, guardando en string un json con las calorias.
        await AsyncStorage.setItem(
          MY_FOOD_KEY,
          JSON.stringify([
            {
              calories,
              name,
              portion,
            },
          ]),
        );

        return Promise.resolve('Exito.');
      }
    } catch (error) {
      Promise.reject(error);
    }
  };
  //Metodo para obtener la comida.
  const handleGetFood = async () => {
    try {
      //Se obtiene la comida ya registrada en el asyncStorage
      const foods = await AsyncStorage.getItem(MY_FOOD_KEY);
      if (foods != null) {
        //Si hay, se obtiene y lo retorna.
        const parsedFood = JSON.parse(foods);
        return Promise.resolve(parsedFood);
      }
    } catch (error) {
      //Si no hay, retorna error.
      return Promise.reject(error);
    }
  };

  return {
    onSaveFood: handleSaveFood,
    onGetFood: handleGetFood,
  };
};

export default useFoodStorage;
