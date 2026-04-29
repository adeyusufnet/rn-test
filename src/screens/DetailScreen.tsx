import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { UserCard } from '../components/UserCard';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const styles = getStyles(isDarkMode);

  const { user } = route.params || {};

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>User data is unavailable.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Reusable Component from Home */}
      <UserCard user={user} disabled={true} />

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>{user.phone}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Website:</Text>
          <Text style={styles.detailValue}>{user.website}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Address</Text>
        <Text style={styles.addressText}>
          {user.address.street}, {user.address.suite}
        </Text>
        <Text style={styles.addressText}>
          {user.address.city}, {user.address.zipcode}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Company</Text>
        <Text style={styles.companyName}>{user.company.name}</Text>
        <Text style={styles.companyPhrase}>"{user.company.catchPhrase}"</Text>
        <Text style={styles.companyBs}>{user.company.bs}</Text>
      </View>
    </ScrollView>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#F5F5F5',
    },
    content: {
      paddingBottom: 24,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#121212' : '#F5F5F5',
    },
    emptyText: {
      fontSize: 16,
      color: isDarkMode ? '#AAAAAA' : '#666666',
    },
    detailsContainer: {
      backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      marginHorizontal: 16,
      marginTop: 8,
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode ? 0.3 : 0.05,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#333333',
      marginBottom: 12,
      marginTop: 8,
    },
    detailRow: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    detailLabel: {
      width: 80,
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#AAAAAA' : '#666666',
    },
    detailValue: {
      flex: 1,
      fontSize: 14,
      color: isDarkMode ? '#DDDDDD' : '#444444',
    },
    addressText: {
      fontSize: 14,
      color: isDarkMode ? '#DDDDDD' : '#444444',
      marginBottom: 4,
      lineHeight: 20,
    },
    companyName: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#DDDDDD' : '#444444',
      marginBottom: 4,
    },
    companyPhrase: {
      fontSize: 14,
      fontStyle: 'italic',
      color: isDarkMode ? '#AAAAAA' : '#666666',
      marginBottom: 4,
    },
    companyBs: {
      fontSize: 14,
      color: isDarkMode ? '#888888' : '#888888',
    },
    divider: {
      height: 1,
      backgroundColor: isDarkMode ? '#333333' : '#EEEEEE',
      marginVertical: 16,
    },
  });
