import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#737373" />
      <TextInput
        style={styles.input}
        placeholder="Search your notes..."
        placeholderTextColor="#737373"
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderRadius: 30,
        height: 50,
        marginHorizontal: 10,
        borderColor: "#171C26"
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#171C26"
    }
})
