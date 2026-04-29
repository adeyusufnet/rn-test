import { Text, TouchableOpacity, View } from "react-native";

export default function HeaderComponent({
    email,
    logout,
    styles
}: {
    email: string | null;
    logout: () => void;
    styles: any;
}) {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.greeting}>Hello,</Text>
                <Text style={styles.emailText}>{email}</Text>
            </View>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}