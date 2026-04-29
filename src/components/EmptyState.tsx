import { Text, View } from "react-native";

export default function EmptyState({ loading, styles }: { loading: boolean, styles: any }) {
    if (loading) return null; // Avoid showing empty state while loading initially
    return (
        <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>No data available</Text>
        </View>
    );
}