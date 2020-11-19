import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from "react-native";
import { Colors } from './Colors';
import Icon from "react-native-vector-icons/MaterialIcons";



export default class Accordian extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          status: props.status,
          price: props.price,
          expanded : false,
        }
    }



  
  render() {

    return (
       <View >
            <TouchableOpacity  style={styles.row} onPress={()=>this.toggleExpand()}>
                <View style={{flexDirection:'row'}}>
                <Icon name={this.props.status === 4 ? 'check' : 'close'} size={30} color={this.props.color} />
                <Text style={[styles.title, styles.font]}> {this.props.title}</Text>
                <Text style={[styles.title, styles.font,{color:this.props.color,marginLeft:70,fontSize:18}]}>{this.state.expanded === false ? this.props.price:''}</Text>
                </View>
                
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={Colors.DARKGRAY} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={[styles.child,{flexDirection:'row',alignItems:"center"}]}>
                <View style={{width:'75%'}}>
                    <Text>{this.props.data}</Text></View>
                 <View style={{width:'25%',alignItems:"flex-start"}}>
                 <Text style={{fontSize:25,color:this.props.color,fontWeight:"bold"}}> {this.props.price}</Text>
                 </View> 
                </View>
            }
            
       </View>
    )
  }

  toggleExpand=()=>{
    this.setState({expanded : !this.state.expanded})
  }

}


const styles = StyleSheet.create({
    title:{
        marginLeft: 10,
        fontSize: 14,
        fontWeight:'bold',
        color:Colors.DARKGRAY,
    },
    
    row:{

        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor:'#EEF1F2',
 	    borderRadius:10,
    },

    status_success:{
        color:'green',
    },
    status_cancel:{
        color:'red',
    },

    parentHr:{
        height:4,
       color: Colors.WHITE,
        width:'100%'
    },
    child:{
        backgroundColor:'#f7f7f7',
        padding:16,
	marginTop:0,
	marginBottom:3,
 	borderRadius:10,
	//borderWidth:1,
	//borderBottomWidth:2,
	//borderLeftWidth:2,
	//borderRightWidth:2,
    }
    
});
