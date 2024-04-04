import { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import { Button } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const demoData = {
  demoChecklist: [
    'Check entire vehicle for students',
    'Report any maintenance issues',
    'Clean up all the lights'
  ]
}

function PostCheckScreen({ navigation }) {

  const insets = useSafeAreaInsets()
  const [reportText, setReportText] = useState('')
  const t = Array(demoData.demoChecklist.length).fill(false)
  const [checkList, setCheckList] = useState(t);

  useEffect(() => {
    const loadData = async () => {
      // TODO: load data from backend/database
    }
    loadData()
    const unsubscribe = navigation.addListener('focus', () => loadData())
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      {/* TODO: replace hard coding 3 times with FlatList (currently just for demo) */}
      <View style={styles.itemRow}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.itemCol}
          onPress={() => {
            const newCheckList = [...checkList]
            newCheckList[0] = !newCheckList[0]
            setCheckList(newCheckList)
          }}
        >
          <View style={styles.itemIcon}>
            <MaterialCommunityIcons name="car-child-seat" size={46} color={'#2474b3'} />
          </View>
          <Text style={styles.itemText}>{demoData.demoChecklist[0]}</Text>
          {checkList[0] && <MaterialCommunityIcons style={styles.checkedIcon} name="checkbox-marked-circle" size={32} color="orange" />}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.itemCol}
          onPress={() => {
            const newCheckList = [...checkList]
            newCheckList[1] = !newCheckList[1]
            setCheckList(newCheckList)
          }}
        >
          <View style={styles.itemIcon}>
            <MaterialCommunityIcons name="clipboard-list-outline" size={46} color={'#2474b3'} />
          </View>
          <Text style={styles.itemText}>{demoData.demoChecklist[1]}</Text>
          {checkList[1] && <MaterialCommunityIcons style={styles.checkedIcon} name="checkbox-marked-circle" size={32} color="orange" />}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.itemCol}
          onPress={() => {
            const newCheckList = [...checkList]
            newCheckList[2] = !newCheckList[2]
            setCheckList(newCheckList)
          }}
        >
          <View style={styles.itemIcon}>
            <MaterialCommunityIcons name="car-light-dimmed" size={46} color={'#2474b3'} />
          </View>
          <Text style={styles.itemText}>{demoData.demoChecklist[2]}</Text>
          {checkList[2] && <MaterialCommunityIcons style={styles.checkedIcon} name="checkbox-marked-circle" size={32} color="orange" />}
        </TouchableOpacity>
      </View>
      <View style={styles.reportContainer}>
        <View style={styles.reportTitle}>
          <Text style={styles.reportTitleText}>Reports</Text>
          <Text style={styles.reportTitleSubtext}>Optional</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            multiline
            placeholder="Please fill in anything if necessary..."
            mode="outlined"
            value={reportText}
            onChangeText={text => setReportText(text)}
            style={styles.input}
            outlineColor="#2474b3"
            activeOutlineColor="#2474b3"
            outlineStyle={{ borderRadius: 12 }}
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          type='text'
          color='error'
          titleStyle={styles.reportButtonText}
          buttonStyle={styles.reportButton}
          containerStyle={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('DamageReport')
          }}
        >
          Report Damage
        </Button>
        <Button
          disabled={checkList.some((e) => e === false)}
          titleStyle={styles.buttonText}
          buttonStyle={checkList.some((e) => e === false) ? { ...styles.button, borderColor: '#e8e4ec' } : styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('Routes')
          }}
        >
          End Trip
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  itemRow: {
    flexDirection: 'row',
    width: '100%',
    flex: 0.32,
    backgroundColor: '#2474b3',
    paddingHorizontal: '2%',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  itemCol: {
    flex: 0.33333,
    flexDirection: 'column',
    backgroundColor: 'yellow',
    marginHorizontal: '2%',
    marginTop: '7%',
    marginBottom: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3ecf2',
    borderRadius: 14,
    paddingHorizontal: '2%',
  },
  itemIcon: {
    position: 'absolute',
    top: '16%'
  },
  itemText: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    position: 'absolute',
    top: '50%'
  },
  buttonsContainer: {
    width: '90%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '3.5%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '46%'
  },
  button: {
    borderRadius: 30,
    borderWidth: 1.5
  },
  reportButton: {
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: 'red'
  },
  reportButtonText: {
    fontSize: 20,
    borderRadius: 20,
    color: 'red'
  },
  buttonText: {
    fontSize: 20,
    borderRadius: 20
  },
  checkedIcon: {
    position: 'absolute',
    top: '2%',
    right: '3%'
  },
  reportContainer: {
    flex: 0.56,
    width: '100%',
    alignItems: 'center'
  },
  reportTitle: {
    width: '90%',
    flex: 0.15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '3%'
  },
  reportTitleText: {
    fontSize: 20
  },
  reportTitleSubtext: {
    fontSize: 18,
    color: 'grey',
    fontStyle: 'italic'
  },
  inputContainer: {
    flex: 0.88,
    width: '90%'
  },
  input: {
    backgroundColor: 'white',
    height: 300
  },
});

export default PostCheckScreen;
