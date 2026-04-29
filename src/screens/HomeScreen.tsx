import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { fetchUsers, User } from '../api/users';
import { UserCard } from '../components/UserCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import HeaderComponent from '../components/Header';
import EmptyState from '../components/EmptyState';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const { email, logout } = useAuthStore();
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const handleUserPress = (user: User) => {
    navigation.navigate('Detail', { user });
  };

  const styles = getStyles(isDarkMode);

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error && !refreshing && users.length === 0) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadData}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard user={item} onPress={() => handleUserPress(item)} />
        )}
        ListHeaderComponent={<HeaderComponent email={email} logout={logout} styles={styles} />}
        ListEmptyComponent={<EmptyState loading={loading} styles={styles} />}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={isDarkMode ? '#FFFFFF' : '#007AFF'}
            colors={['#007AFF']}
          />
        }
      />
    </View>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#F5F5F5',
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    listContent: {
      paddingBottom: 24,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#333333' : '#E0E0E0',
      marginBottom: 8,
      marginTop: 24,
      padding: 24
    },
    greeting: {
      fontSize: 14,
      color: isDarkMode ? '#AAAAAA' : '#666666',
      marginBottom: 2,
    },
    emailText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#333333',
    },
    logoutButton: {
      paddingHorizontal: 12,
      paddingVertical: 12,
      backgroundColor: isDarkMode ? '#333333' : '#F0F0F0',
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoutText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#FF3B30',
    },
    errorText: {
      fontSize: 16,
      color: '#FF3B30',
      textAlign: 'center',
      marginBottom: 16,
    },
    retryButton: {
      backgroundColor: '#007AFF',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    retryText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    emptyText: {
      fontSize: 16,
      color: isDarkMode ? '#AAAAAA' : '#666666',
      marginTop: 40,
    },
  });
