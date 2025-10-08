import { Ionicons } from '@expo/vector-icons'; // 👈 for trash icon
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { useMovieLists } from '../../../hooks/useMovieLists';
import { getProfile } from '../../../utils/dataParser';
import styles from '../settings/styles';

export default function ProfileScreen() {
  const profile = getProfile();
  const { lists, loading, deleteList } = useMovieLists(); // 👈 assuming your hook exposes a delete method

  if (loading) return <styles.LoadingText>Loading your profile...</styles.LoadingText>;

  const handleDelete = async (listId: string) => {
    try {
      await deleteList(listId);
      console.log(`List ${listId} deleted`);
    } catch (error) {
      console.error('Failed to delete list:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <styles.Container>
        {/* Profile Header */}
        <styles.Avatar source={{ uri: profile.avatar }} />
        <styles.Name>{profile.name}</styles.Name>
        <styles.Email>{profile.email}</styles.Email>
        <styles.Bio>{profile.bio}</styles.Bio>

        <styles.Stats>
          <styles.StatBox>
            <styles.StatNumber>{profile.followers}</styles.StatNumber>
            <styles.StatLabel>Followers</styles.StatLabel>
          </styles.StatBox>
          <styles.StatBox>
            <styles.StatNumber>{profile.following}</styles.StatNumber>
            <styles.StatLabel>Following</styles.StatLabel>
          </styles.StatBox>
        </styles.Stats>
      </styles.Container>

      {/* Movie Lists */}
      {lists.length > 0 ? (
        lists.map(list => (
          <View key={list.id} style={{ marginTop: 20 }}>
            {/* Header Row with Delete Button */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <styles.SectionTitle>{list.name}</styles.SectionTitle>

              <TouchableOpacity onPress={() => handleDelete(list.id)}>
                <Ionicons name="trash-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={list.movies}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              renderItem={({ item }) => (
                <Link key={item.id} href={`/home/movie/${item.id}`} asChild>
                  <styles.TrendingCard
                    movie={{
                      id: item.id.toString(),
                      title: item.title,
                      year: item.release_date?.split('-')[0],
                      genre: 'N/A',
                      rating: item.vote_average,
                      poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                      description: item.overview,
                    }}
                  />
                </Link>
              )}
            />
          </View>
        ))
      ) : (
        <styles.EmptyText>No movie lists found</styles.EmptyText>
      )}
    </ScrollView>
  );
}
