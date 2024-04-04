import { useEffect, useState, useCallback } from "react";

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from '@rneui/themed';
import {
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars';

import { getFutureDates } from "../util";

const dates = getFutureDates(11)

const agendaItems = [
  {
    title: dates[0],
    data: [
      { time: '1:45 pm', duration: '1h 15min', title: 'Panther AM', vehicle: 'Bus 1' },
      { time: '2:30 pm', duration: '1h 15min', title: 'Aquarium Trip', vehicle: 'Bus 3' },
      { time: '4:05 pm', duration: '1h 15min', title: 'Panther AM', vehicle: 'Bus 2' }
    ]
  },
  {
    title: dates[1],
    data: [
      { time: '12:00 pm', duration: '1h', title: 'Panther AM', vehicle: 'Bus 1' },
      { time: '2:00 pm', duration: '1h', title: 'Aquarium Trip', vehicle: 'Bus 3' }
    ]
  },
  {
    title: dates[2],
    data: [{}]
  },
  {
    title: dates[3],
    data: [
      { time: '9:05 pm', duration: '1h', title: 'Middle Yoga', vehicle: 'Bus 1' },
      { time: '10:15 pm', duration: '1h', title: 'Ashtanga', vehicle: 'Bus 2' },
      { time: '11 pm', duration: '1h', title: 'TRX', vehicle: 'Bus 4' },
      { time: '12:30 pm', duration: '1h', title: 'Running Group', vehicle: 'Bus 1' }
    ]
  },
  {
    title: dates[4],
    data: [
      { time: '12:10 pm', duration: '1h', title: 'Panther AM', vehicle: 'Bus 1' }
    ]
  },
  {
    title: dates[5],
    data: [
      { time: '2:45 pm', duration: '1h', title: 'Panther AM', vehicle: 'Bus 1' }
    ]
  },
  {
    title: dates[6],
    data: [{}]
  },
  {
    title: dates[7],
    data: [
      { time: '9:50 pm', duration: '1h', title: 'Pilates Reformer', vehicle: 'Bus 1' },
      { time: '10:15 pm', duration: '1h', title: 'Ashtanga', vehicle: 'Bus 2' },
    ]
  },
  {
    title: dates[8],
    data: [
      { time: '1:20 pm', duration: '1h', title: 'Panther AM', vehicle: 'Bus 1' },
      { time: '2:30 pm', duration: '1h', title: 'Aquarium Trip', vehicle: 'Bus 2' },
      { time: '3:50 pm', duration: '1h', title: 'Panther AM', vehicle: 'Bus 1' }
    ]
  },
  {
    title: dates[9],
    data: [{}]
  },
  {
    title: dates[10],
    data: [
      { time: '12:35 pm', duration: '1h', title: 'Last Yoga' }
    ]
  }
];

const demoData = {
  userName: 'John',
  agendaItems: agendaItems
}

const getMarkedDates = (items) => {
  const marked = {};
  items.forEach(item => {
    // NOTE: only mark dates with data
    if (item.data && item.data.length > 0 && Object.keys(item.data[0]).length > 0) {
      marked[item.title] = {
        marked: true,
        selectedColor: "#FBC335",
        selectedTextColor: "white",
        // dotColor: "#FBC335",
      };
    }
    else {
      marked[item.title] = {
        disabled: true,
        selectedColor: "#FBC335",
      };
    }
  });
  return marked
}

const RoutesScreen = ({ navigation }) => {

  const insets = useSafeAreaInsets()

  const [selectedAgenda, setSelectedAgenda] = useState(demoData.agendaItems[0].data)

  useEffect(() => {
    const loadData = async () => {
      // TODO: load data from backend/database
    }
    loadData()
    const unsubscribe = navigation.addListener('focus', () => loadData())
    return unsubscribe
  }, [navigation])

  return (
    <View
      style={{
        ...styles.container,
        // Paddings to handle safe area
        paddingTop: insets.top,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Hi {demoData.userName}!</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('Profile')
          }}
        >
          <Avatar
            size={40}
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/4.jpg" }}
          />
        </TouchableOpacity>
      </View>
      <CalendarProvider
        date={demoData.agendaItems[0]?.title}
        style={styles.calendarContainer}
        showTodayButton
        onDateChanged={(date) => {
          const newAgenda = demoData.agendaItems.filter(item => item.title === date)
          setSelectedAgenda(newAgenda.length > 0 ? newAgenda[0].data : [])
        }}
      >
        <ExpandableCalendar
          firstDay={7}
          markedDates={getMarkedDates(demoData.agendaItems)}
        />
        <SafeAreaView style={styles.agendasContainer}>
          <FlatList
            data={selectedAgenda}
            renderItem={({ item }) => {
              if (Object.keys(item).length > 0) {
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.agendaItemContainer}
                    onPress={() => {
                      navigation.navigate('RoutesDetail', {
                        agenda: item
                      })
                    }}
                  >
                    <View style={styles.agendaHeader}>
                      <View style={styles.agendaAvatars}>
                        <Avatar
                          size={40}
                          rounded
                          source={{ uri: "https://randomuser.me/api/portraits/men/4.jpg" }}
                          avatarStyle={{borderWidth: 2, borderColor: '#d0dfea'}}
                        />
                        <Avatar
                          size={40}
                          rounded
                          source={{ uri: "https://randomuser.me/api/portraits/women/2.jpg" }}
                          avatarStyle={{borderWidth: 2, borderColor: '#d0dfea'}}
                        />
                        <Avatar
                          size={40}
                          rounded
                          source={{ uri: "https://randomuser.me/api/portraits/men/30.jpg" }}
                          avatarStyle={{borderWidth: 2, borderColor: '#d0dfea'}}
                        />
                      </View>
                      <Text style={styles.agendaTimeStamp}>{item.time}</Text>
                    </View>
                    <View style={styles.agendaVehicle}>
                      <Text style={styles.agendaVehicleTitle}>Vehicle:</Text>
                      <Text style={styles.agendaVehicleContent}>{item.vehicle}</Text>
                    </View>
                    <Text style={styles.agendaTrip}>{item.title}</Text>
                  </TouchableOpacity>
                )
              }
            }}
          />
        </SafeAreaView>
      </CalendarProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  header: {
    flex: 0.1,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: '2%'
  },
  headerText: {
    fontSize: 26,
    fontWeight: '600',
  },
  calendarContainer: {
    flex: 0.9,
    width: '100%',
  },
  agendasContainer: {
    flex: 1,
  },
  agendaItemContainer: {
    width: '90%',
    backgroundColor: '#d0dfea',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '5%',
    paddingHorizontal: '2%',
    paddingVertical: '2.5%',
    borderRadius: 16
  },
  agendaHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: '2%',
  },
  agendaAvatars: {
    flexDirection: 'row',
    gap: '-10%'
  },
  agendaTimeStamp: {
    fontSize: 18,
    fontWeight: '500',
  },
  agendaVehicle: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: '3%',
    marginTop: '5%',
    alignItems: 'baseline'
  },
  agendaVehicleTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: '1%'
  },
  agendaVehicleContent: {
    fontSize: 16,
  },
  agendaTrip: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginTop: '1%',
    paddingHorizontal: '3%',
  }
});

export default RoutesScreen;
