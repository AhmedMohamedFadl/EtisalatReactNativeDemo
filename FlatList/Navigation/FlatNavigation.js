import {
  createStackNavigator,
  } from 'react-navigation';
import BasicFlatList from '../Components/BasicFlatList';
import ItemDetails from '../Components/ItemDetails';


  const FlatNavigator = createStackNavigator({
    Home: { screen: BasicFlatList, 
        navigationOptions : {
            header:null
        }
    },
    Item: { screen: ItemDetails },
  });  

export default FlatNavigator ;
