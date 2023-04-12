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

function SelectedBusiness({ business }) {
    if (!business) return null;

    return (
        <View style={styles.selectedBusinessContainer}>
            <Text style={styles.selectedBusinessName}>{business.name}</Text>
            <Text style={styles.selectedBusinessAddress}>
                {business.location.address1}
            </Text>
        </View>
    );
}

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
            <Searchbar
                placeholder="Search for restaurants"
                onChangeText={handleSearch}
                value={searchQuery}
                style={styles.searchBar}
            />
            {loading && <ActivityIndicator animating={true} style={styles.loading} />}
            <View>
                {searchResults.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => handleSelectBusiness(item)}>
                        <Text style={styles.searchResult}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <SelectedBusiness business={selectedBusiness} />
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 10,
    },

    searchBar: {
        marginBottom: 10,
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

    selectedBusinessContainer: {
        marginTop: 10,
    },

    selectedBusinessName: {
        fontWeight: "bold",
        fontSize: 16,
    },

    selectedBusinessAddress: {
        fontSize: 14,
    },
});
