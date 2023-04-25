import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Searchbar, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import colors from "../colors"
import { YELP_API_KEY } from "@env";
import { DefaultTheme } from 'react-native-paper';

const customSearchbarTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        placeholder: colors.gray,
    },
};

export default function RestaurantSearch({ onBusinessSelect }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);

    const handleSearch = async (query) => {
        setSearchQuery(query);

        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
                headers: {
                    Authorization: `Bearer ${YELP_API_KEY}`,
                },
                params: {
                    term: query,
                    location: 'Vancouver',
                    limit: 5, // Limit the number of results
                },
            });

            setSearchResults(response.data.businesses);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleSelectBusiness = (business) => {
        onBusinessSelect(business);
        setSearchQuery('');
        setSearchResults([]);
        setSelectedBusiness(business);
    };

    return (
        <View style={styles.searchContainer}>
            <Text style={styles.searchBarTitle}>Add Location</Text>
            <Searchbar
                theme={customSearchbarTheme}
                placeholder="Search Restaurant Location by Name"
                onChangeText={handleSearch}
                value={searchQuery}
                style={styles.searchBar}
                inputStyle={styles.searchBarInput}

            />
            {loading && <ActivityIndicator animating={true} style={styles.loading} />}
            <View>
                {searchResults.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => handleSelectBusiness(item)}>
                        <Text style={styles.searchResult}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 10,

    },

    searchBar: {
        marginBottom: 5,
        backgroundColor: (colors.white),
    },

    loading: {
        marginTop: 10,
    },

    searchResult: {
        paddingVertical: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },

    
    searchBarInput: {
        textAlign: 'left',
        fontSize: 15,

    },
    searchBarTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    }
});
