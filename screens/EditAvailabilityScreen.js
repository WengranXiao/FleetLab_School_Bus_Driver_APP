import { useEffect, useState } from "react";

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  CalendarProvider,
  ExpandableCalendar,
  WeekCalendar
} from 'react-native-calendars';
import {
  CheckBox,
  Divider
} from "@rneui/themed";

import { getFutureDates } from "../util";

const dates = getFutureDates(7)
const availabilityItems = [
  {
    title: dates[0],
    data: {
      morning: false,
      midday: false,
      afternoon: true,
      evening: false
    }
  },
  {
    title: dates[1],
    data: {
      morning: false,
      midday: true,
      afternoon: false,
      evening: true
    }
  },
  {
    title: dates[2],
    data: {
      morning: false,
      midday: false,
      afternoon: false,
      evening: false
    }
  },
  {
    title: dates[3],
    data: {
      morning: false,
      midday: true,
      afternoon: false,
      evening: true
    }
  },
  {
    title: dates[4],
    data: {
      morning: false,
      midday: false,
      afternoon: false,
      evening: false
    }
  },
  {
    title: dates[5],
    data: {
      morning: false,
      midday: false,
      afternoon: false,
      evening: false
    }
  },
  {
    title: dates[6],
    data: {
      morning: false,
      midday: true,
      afternoon: true,
      evening: false
    }
  }
]

const demoData = {
  availabilityItems: availabilityItems
}


function EditAvailabilityScreen({ navigation }) {

  const [date, setDate] = useState(demoData.availabilityItems[0].title)
  const [all, setAll] = useState(demoData.availabilityItems)

  useEffect(() => {
    const loadData = async () => {
      // TODO: load data from backend/database
    }
    loadData()
    const unsubscribe = navigation.addListener('focus', () => loadData())
    return unsubscribe
  }, [navigation])

  const startDate = demoData.availabilityItems[0].title
  const endDate = demoData.availabilityItems[demoData.availabilityItems.length - 1].title

  const getMarkedDates = (items) => {
    const marked = {};
    items.forEach(item => {
      // NOTE: only mark dates with data
      if (item.data.morning || item.data.midday || item.data.afternoon || item.data.evening) {
        marked[item.title] = {
          marked: true,
          selectedColor: "#FBC335",
          selectedTextColor: "white",
          // dotColor: "#FBC335",
        };
      } else {
        marked[item.title] = {
          marked: false,
          selectedColor: "#FBC335"
        };
      }
    });
    return marked
  }

  return (
    <View style={styles.container}>
      <CalendarProvider
        date={date}
        style={styles.calendarContainer}
        showTodayButton
        onDateChanged={(selectedDate) => {
          setDate(selectedDate)
        }}
      >
        <ExpandableCalendar
          firstDay={7}
          markedDates={getMarkedDates(all)}
        />
        {date >= startDate && date <= endDate &&
          <SafeAreaView style={styles.availabilityContainer}>
            <View>
              <CheckBox
                checked={all.filter(item => item.title === date)?.[0].data.morning || false}
                title={'Morning (6:00am - 9:00am)'}
                size={30}
                onPress={() => {
                  const updatedAll = all.map(item => item.title === date ? {
                    ...item,
                    data: {
                      ...item.data,
                      morning: !item.data.morning
                    }
                  } : item)
                  setAll(updatedAll)
                }}
                textStyle={styles.itemText}
                containerStyle={styles.availabilityItem}
              />
              <Divider style={styles.divider} />
              <CheckBox
                checked={all.filter(item => item.title === date)?.[0].data.midday || false}
                title={'Midday (9:00am - 3:00pm)'}
                size={30}
                onPress={() => {
                  const updatedAll = all.map(item => item.title === date ? {
                    ...item,
                    data: {
                      ...item.data,
                      midday: !item.data.midday
                    }
                  } : item)
                  setAll(updatedAll)
                }}
                textStyle={styles.itemText}
                containerStyle={styles.availabilityItem}
              />
              <Divider style={styles.divider} />
              <CheckBox
                checked={all.filter(item => item.title === date)?.[0].data.afternoon || false}
                title={'Afternoon (3:00pm - 5:00pm)'}
                size={30}
                onPress={() => {
                  const updatedAll = all.map(item => item.title === date ? {
                    ...item,
                    data: {
                      ...item.data,
                      afternoon: !item.data.afternoon
                    }
                  } : item)
                  setAll(updatedAll)
                }}
                textStyle={styles.itemText}
                containerStyle={styles.availabilityItem}
              />
              <Divider style={styles.divider} />
              <CheckBox
                checked={all.filter(item => item.title === date)?.[0].data.evening || false}
                title={'Evening (5:00pm - 9:00pm)'}
                size={30}
                onPress={() => {
                  const updatedAll = all.map(item => item.title === date ? {
                    ...item,
                    data: {
                      ...item.data,
                      evening: !item.data.evening
                    }
                  } : item)
                  setAll(updatedAll)
                }}
                textStyle={styles.itemText}
                containerStyle={styles.availabilityItem}
              />
            </View>
          </SafeAreaView>}
      </CalendarProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  header: {
    flex: 0.15,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
  },
  calendarContainer: {
    width: '100%',
  },
  availabilityContainer: {
    alignSelf: 'center',
    marginTop: '7%',
    width: '88%',
    shadowRadius: '12',
    borderRadius: '16',
    backgroundColor: 'white',
    shadowColor: '#5c5c5c',
    shadowRadius: '3',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 3
    },
    paddingVertical: '3%',
    paddingHorizontal: '3%'
  },
  availabilityItem: {
    marginVertical: '5%'
  },
  itemText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black'
  },
  divider: {
    alignSelf: 'center',
    width: '90%',
  }
});

export default EditAvailabilityScreen;
