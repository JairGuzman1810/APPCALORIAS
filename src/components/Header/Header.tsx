import {useNavigation} from '@react-navigation/native';
import {Icon, Image} from '@rneui/base';
import {Button} from '@rneui/themed';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const StaticInfo = {
  name: 'Jair Guzman',
  uri: 'https://avatars.githubusercontent.com/u/93452342?v=4',
};

const Header = () => {
  const {canGoBack, goBack} = useNavigation();
  return (
    <View style={styles.container}>
      {canGoBack() ? (
        <View style={styles.arrowContainer}>
          <Button
            icon={<Icon name="arrow-back" size={24} />}
            type="clear"
            onPress={goBack}
          />
        </View>
      ) : undefined}
      <View style={styles.leftcontainer}>
        <Text style={styles.name}>{`Hello ${StaticInfo.name}`}</Text>
        <Text style={styles.subtitle}>Welcome back to your goal</Text>
      </View>
      <View style={styles.rightcontainer}>
        {/* Asi se asigna una imagen de un arreglo. */}
        <Image style={styles.profileimage} source={{uri: StaticInfo.uri}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Para que se muestre como fila el contenido, osea vertical
    flexDirection: 'row',
  },
  leftcontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightcontainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#808080',
  },
  profileimage: {
    width: 40,
    height: 40,
    borderRadius: 24,
  },
  arrowContainer: {},
});

export default Header;
