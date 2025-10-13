import { useMovieLists } from '@/hooks/useMovieLists';
import { useAuth } from '@/providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styles from '../settings/styles';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { lists, loading: listLoading, deleteList } = useMovieLists();
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/settings/editProfile')}
              style={{ marginRight: 16 }}>
              <Ionicons name="create-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
        }}
      />

      {authLoading || listLoading ? (
        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
      ) : !user ? (
        <styles.EmptyText>No user data available</styles.EmptyText>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <styles.Container>
            {/* Avatar with Loader */}
            <styles.AvatarContainer>
              <styles.Avatar
                key={user.avatar}
                source={{
                  uri: user.avatar || 'https://via.placeholder.com/150/cccccc?text=No+Image',
                }}
                onLoadStart={() => setImageLoading(true)}
                onLoadEnd={() => setImageLoading(false)}
              />
              {imageLoading && (
                <styles.AvatarLoader>
                  <ActivityIndicator size="small" color="#007AFF" />
                </styles.AvatarLoader>
              )}
            </styles.AvatarContainer>
            <styles.Name>{user.name || 'Unnamed User'}</styles.Name>

            {/* Email + Country Row */}
            <View style={{ alignItems: 'center', marginVertical: 8 }}>
              {/* Email Row */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Ionicons name="mail-outline" size={16} color="#666" style={{ marginRight: 6 }} />
                <Text style={{ fontSize: 14, color: '#666' }}>{user.email || 'No email'}</Text>
              </View>

              {/* Country Row (optional) */}
              {user.country ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons
                    name="earth-outline"
                    size={16}
                    color="#666"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={{ fontSize: 14, color: '#666' }}>{user.country}</Text>
                </View>
              ) : null}
            </View>

            {/* Bio */}
            {user.bio && (
              <styles.Bio style={{ marginTop: 8, textAlign: 'center' }}>{user.bio}</styles.Bio>
            )}

            {/* Stats */}
            <styles.Stats>
              <styles.StatBox>
                <styles.StatNumber>{user.followers ?? 0}</styles.StatNumber>
                <styles.StatLabel>Followers</styles.StatLabel>
              </styles.StatBox>
              <styles.StatBox>
                <styles.StatNumber>{user.following ?? 0}</styles.StatNumber>
                <styles.StatLabel>Following</styles.StatLabel>
              </styles.StatBox>
            </styles.Stats>
          </styles.Container>

          {/* Movie Lists */}
          {lists.length > 0 ? (
            lists.map(list => (
              <View key={list.id} style={{ marginTop: 20 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  <styles.SectionTitle>{list.name}</styles.SectionTitle>
                  <TouchableOpacity onPress={() => deleteList(list.id)}>
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
      )}
    </>
  );
}
