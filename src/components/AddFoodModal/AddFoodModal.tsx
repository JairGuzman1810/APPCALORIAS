import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {Button, Icon} from '@rneui/themed';
import {Input} from '@rneui/base';
//Propiedades para manejar el cierre y visibilidad
type AddFoodModalProps = {
  onClose: () => void;
  visible: boolean;
};

const AddFoodModal: FC<AddFoodModalProps> = ({onClose, visible}) => {
  const [calories, setCalories] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [portion, setPortion] = useState<string>('');

  //Si la visibilidad del modal cambia, se reinician los
  useEffect(() => {
    setCalories('');
    setName('');
    setPortion('');
  }, [visible]);

  const handleAddPress = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      animationType="slide">
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Button
              icon={<Icon name="close" size={28} />}
              type="clear"
              onPress={onClose}
            />
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input
                value={calories}
                onChangeText={(text: string) => setCalories(text)}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>CAL</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input
                value={name}
                onChangeText={(text: string) => setName(text)}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Nombre</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              {/* Asi se asigna el valor del input a una variable, sin necesidad de ids como se ocuparia en otros casos */}
              <Input
                value={portion}
                onChangeText={(text: string) => setPortion(text)}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Porción</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={'Add'}
              icon={<Icon name="add" color={'#FFF'} />}
              radius={'lg'}
              color={'#4ECB71'}
              //Se pueden poner validaciones en los atributos
              disabled={
                calories.trim() === '' ||
                name.trim() === '' ||
                portion.trim() === ''
              }
              onPress={handleAddPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  content: {
    width: '75%',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    //Configuraciones para las sombras de IOS para el modal.
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    //Configuración para las sombras de Android para el modal.
    elevation: 5,
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
  formItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 2,
  },
  legendContainer: {
    flex: 1,
  },
  legend: {fontWeight: '500'},
  buttonContainer: {
    alignItems: 'flex-end',
  },
});

export default AddFoodModal;
