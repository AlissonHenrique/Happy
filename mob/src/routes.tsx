import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OphanagesMap from "./pages/OphanagesMap";
import OrphanageDetails from "./pages/OrphanageDetails";
import OrphanageData from "./pages/CreateOrphanages/OrphanageData";
import SelectMapPosition from "./pages/CreateOrphanages/SelectMapPosition";
import Header from './components/Header';

 

const { Navigator, Screen } = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false,cardStyle:{backgroundColor:'#f2f3f5'}}}>
        <Screen 
        name="OphanagesMap" 
        component={OphanagesMap}
         />      

        <Screen 
        name="OrphanagesDetails" 
        component={OrphanageDetails} 
        options={{
          headerShown:true,
          header:()=><Header   showCancel={false} title="Orfanato"/>
        }}
       
        /> 
        <Screen 
        name="SelectMapPosition" 
        component={SelectMapPosition}
        options={{
          headerShown:true,
          header:()=><Header title="Selecione no mapa"/>
        }}
         /> 
        <Screen 
        name="OrphanageData" 
        component={OrphanageData}
        options={{
          headerShown:true,
          header:()=><Header title="Informe os dados"/>
        }}
        
        />        
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;
