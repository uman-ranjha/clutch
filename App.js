import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const TEAMS = ['Lakers', 'Warriors', 'Yankees', 'Jets'];
const FAKE_FEED = [
  { id: '1', team: 'Lakers', content: 'LeBron drops 30 in comeback win!' },
  { id: '2', team: 'Warriors', content: 'Curry hits game-winner at the buzzer!' },
  { id: '3', team: 'Yankees', content: 'Judge smashes 2 HRs vs Red Sox.' },
  { id: '4', team: 'Jets', content: 'Jets sign star cornerback to 3-year deal.' },
];

export default function App() {
  const [followedTeams, setFollowedTeams] = useState(['Lakers', 'Warriors']);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const filtered = FAKE_FEED.filter(item => followedTeams.includes(item.team));
    setFeed(filtered);
  }, [followedTeams]);

  const toggleFollow = (team) => {
    setFollowedTeams(prev =>
      prev.includes(team) ? prev.filter(t => t !== team) : [...prev, team]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111' }}>
      <StatusBar style="light" />
      <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', padding: 16 }}>🏀 Clutch</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 10 }}>
        {TEAMS.map(team => (
          <TouchableOpacity
            key={team}
            onPress={() => toggleFollow(team)}
            style={{
              backgroundColor: followedTeams.includes(team) ? '#00f' : '#333',
              padding: 10,
              borderRadius: 8,
              margin: 5,
            }}
          >
            <Text style={{ color: '#fff' }}>{followedTeams.includes(team) ? '✓ ' : ''}{team}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={feed}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#222', padding: 15, margin: 10, borderRadius: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.team}</Text>
            <Text style={{ color: '#ccc' }}>{item.content}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}