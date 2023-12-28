import {isToday} from 'date-fns';
import {Meal} from './../types/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MY_FOOD_KEY = '@MyFood:Key';
const MY_TODAY_FOOD_KEY = '@MyTodayFood:Key';

const useFoodStorage = () => {
  //Metodo para guardar la comida.

  const saveInfoToStorage = async (storageKey: string, meal: Meal) => {
    try {
      //Revisamos si algo esta almacenado.
      const currentSaveFood = await AsyncStorage.getItem(storageKey);
      //Si es diferente a null, significa que hay algo guardado.
      if (currentSaveFood != null) {
        //Convertimos el string a JSON para hacer uso de la info
        const currentSavedFoodParsed = JSON.parse(currentSaveFood);
        //Se agrega la nueva información al JSON.
        currentSavedFoodParsed.push(meal);
        //Se guarda el nuevo JSON a la misma llave, pero se debio convertir en string antes.
        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(currentSavedFoodParsed),
        );

        return Promise.resolve('Exito.');
      } else {
        //Si no hay nada, se crea uno nuevo, guardando en string un json con las calorias.
        await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));

        return Promise.resolve('Exito.');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const handleSaveFood = async ({calories, name, portion}: Meal) => {
    try {
      const result = await saveInfoToStorage(MY_FOOD_KEY, {
        calories,
        name,
        portion,
      });

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleSaveTodayFood = async ({calories, name, portion}: Meal) => {
    try {
      const currentDate = new Date();
      // Subtract a day from the current date
      currentDate.setDate(currentDate.getDate() - 1);
      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        calories,
        name,
        portion,
        date: currentDate.toISOString(),
      });

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  //Metodo para obtener la comida.
  const getInfoFromStorage = async (storageKey: string) => {
    try {
      //Se obtiene la comida ya registrada en el asyncStorage
      const foods = await AsyncStorage.getItem(storageKey);
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

  //Metodo para obtener la comida.
  const handleGetFood = async () => {
    try {
      //Se obtiene la comida ya registrada en el asyncStorage
      const result = await getInfoFromStorage(MY_FOOD_KEY);

      return Promise.resolve(result);
    } catch (error) {
      //Si no hay, retorna error.
      return Promise.reject(error);
    }
  };

  const handleGetTodayFood = async () => {
    try {
      //Se obtiene la comida ya registrada en el asyncStorage
      const result = (await getInfoFromStorage(MY_TODAY_FOOD_KEY)) as Meal[];
      if (result != null) {
        //filtramos por la variable meal, y si el atributo fecha
        //existe, se filtra por la fecha de hoy.
        return Promise.resolve(
          result.filter(meal => meal.date && isToday(new Date(meal.date))),
        );
      } else {
        return Promise.reject('Error');
      }
    } catch (error) {
      //Si no hay, retorna error.
      return Promise.reject(error);
    }
  };

  return {
    onSaveFood: handleSaveFood,
    onSaveTodayFood: handleSaveTodayFood,
    onGetFood: handleGetFood,
    onGetTodayFood: handleGetTodayFood,
  };
};

export default useFoodStorage;
