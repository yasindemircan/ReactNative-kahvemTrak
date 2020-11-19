import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import  rootReducer from './pages/redux/reducers/rootReducer'


import {LoginMain} from "./pages/components/loginPage"
import {Register} from "./pages/components/register"
import {Verify} from "./pages/components/Verify"
import {ForgetPassword} from "./pages/components/forgetPage-1"
import {Forget2Page} from "./pages/components/forgetPassword-2"
import {loadingPage} from "./pages/components/loadingPage"
import {Home} from "./pages/components/homePage";
import Hdrinks from "./pages/components/hot_drinks";
import {cartPage} from "./pages/components/cartPage";
import {giveGift} from "./pages/components/giftPage";
import {Giftqr} from "./pages/components/qr";
import {Orderqr} from "./pages/components/orderQr";
import {OrderHistory} from "./pages/components/orderHistory"

const Stack = createStackNavigator();
const store = createStore(rootReducer)

function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={LoginMain} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="Forget2Page" component={Forget2Page} />
        
        <Stack.Screen name="Loading" component={loadingPage} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Drinks" component={Hdrinks} />
        <Stack.Screen name="Cart" component={cartPage} />
        <Stack.Screen name="Gift" component={giveGift} />
        <Stack.Screen name="GiftqrPage" component={Giftqr} />
        <Stack.Screen name="Orderqr" component={Orderqr} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />

      </Stack.Navigator>
    </NavigationContainer> 
    </Provider>
  );
}

export default App;